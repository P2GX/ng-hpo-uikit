import type { Meta, StoryObj } from '@storybook/angular';
import { HpoAnnotationPolisherComponent } from './hpo-annotation-polisher.component';

const meta: Meta<HpoAnnotationPolisherComponent> = {
  title: 'Components/HpoAnnotationPolisher',
  component: HpoAnnotationPolisherComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<HpoAnnotationPolisherComponent>;

export const Default: Story = {
  args: {},
};