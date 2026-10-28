import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';
import { expect, fn, waitFor } from 'storybook/test';
import { delay, map, of } from 'rxjs';
import { OntologyAutocompleteComponent } from './ontology-autocomplete.component';
import { OntologyAutocompleteProvider } from '../models/hpo-annotation-models';
import { OntologyMatch } from '../models/ontology-dto';

/**
 * Canned data standing in for a real backend (in the apps this is a Tauri
 * command backed by fenominal). `matchedText` is the string that matched the
 * query, which can be a synonym of the term's primary `label`.
 */
const CANNED_MATCHES: OntologyMatch[] = [
  { id: 'HP:0001250', label: 'Seizure', matchedText: 'Seizure' },
  { id: 'HP:0001250', label: 'Seizure', matchedText: 'Epileptic seizure' },
  { id: 'HP:0002069', label: 'Bilateral tonic-clonic seizure', matchedText: 'Grand mal seizure' },
  { id: 'HP:0007359', label: 'Focal-onset seizure', matchedText: 'Focal seizure' },
  { id: 'HP:0001263', label: 'Global developmental delay', matchedText: 'Developmental delay' },
  { id: 'HP:0000252', label: 'Microcephaly', matchedText: 'Small head' },
];

/**
 * A fake provider: filters the canned list by the typed text and answers
 * after a short delay, like a real backend call would.
 */
const fakeProvider: OntologyAutocompleteProvider = (query: string) =>
  of(CANNED_MATCHES).pipe(
    delay(300),
    map(matches =>
      matches.filter(m => m.matchedText.toLowerCase().includes(query.toLowerCase()))
    )
  );

const meta: Meta<OntologyAutocompleteComponent> = {
  title: 'Components/Ontology Autocomplete',
  component: OntologyAutocompleteComponent,
  tags: ['autodocs'],
  decorators: [
    // The suggestion list opens upwards by default, so leave room above the widget.
    componentWrapperDecorator(
      story => `<div style="padding: 260px 1rem 1rem; max-width: 480px;">${story}</div>`
    ),
  ],
  argTypes: {
    confirmPosition: { control: 'radio', options: ['right', 'bottom'] },
    popupMenuDirection: { control: 'radio', options: ['up', 'down'] },
  },
  args: {
    autocompleteProvider: fakeProvider,
    requireConfirmation: false,
    placeholder: 'Search ontology term...',
    // `fn()` records each emission in the Actions panel.
    selected: fn(),
  },
};

export default meta;
type Story = StoryObj<OntologyAutocompleteComponent>;

/**
 * Instant selection: `selected` is emitted as soon as the user picks a
 * suggestion. Type at least 3 characters (for example "sei") to see matches.
 */
export const InstantSelection: Story = {
  name: 'Autocomplete with instant selection',
  args: {
    placeholder: 'Search clinical phenotypes (e.g., Seizure)...',
  },
};
/**
 * Two-step confirmation: `selected` is emitted after the user picks a
 * suggestion and then clicks the confirm button.
 */
export const TwoStepConfirmation: Story = {
  name: 'Autocomplete with user-confirmation of term',
  args: {
    placeholder: 'Search clinical phenotypes (e.g., Seizure)...',
    requireConfirmation: true,
    confirmPosition: 'bottom'
  },
  /**
   * Acts like a user: types, picks a suggestion, then confirms. The assertions
   * check that nothing is emitted until Confirm is pressed.
   */
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.type(canvas.getByRole('textbox'), 'sei');

    // Suggestions arrive after the debounce plus the fake backend delay, so wait for them.
    // "Epileptic seizure" is a synonym match of HP:0001250, which also covers the
    // case of one term appearing twice in the list.
    const option = await canvas.findByRole('option', { name: /Epileptic seizure/ }, { timeout: 3000 });
    await userEvent.click(option);

    // Picking a suggestion is not enough in two-step mode...
    await expect(args.selected).not.toHaveBeenCalled();

    // ...the user has to press Confirm.
    const confirm = canvas.getByRole('button', { name: /Confirm/ });
    await waitFor(() => expect(confirm).toBeEnabled());
    await userEvent.click(confirm);

    await expect(args.selected).toHaveBeenCalledTimes(1);
    await expect(args.selected).toHaveBeenCalledWith({
      id: 'HP:0001250',
      label: 'Seizure',
      matchedText: 'Epileptic seizure',
    });
  },
}