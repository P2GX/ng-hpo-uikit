import{_ as t,o as n,c as a,a0 as s}from"./chunks/framework.D3PETOto.js";const h=JSON.parse('{"title":"HPO Text Mining Container","description":"","frontmatter":{},"headers":[],"relativePath":"components/hpo-text-mining-container.md","filePath":"components/hpo-text-mining-container.md"}'),i={name:"components/hpo-text-mining-container.md"};function r(o,e,p,l,c,d){return n(),a("div",null,[...e[0]||(e[0]=[s(`<h1 id="hpo-text-mining-container" tabindex="-1">HPO Text Mining Container <a class="header-anchor" href="#hpo-text-mining-container" aria-label="Permalink to &quot;HPO Text Mining Container&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <code>lib-text-mining-container</code> component functions as a pure, presentation-layer text annotation interface. It accepts an array of FenominalSentence structures and captures user span adjustments via the hitUpdated output.</p><p>When a user alters a badge boundary or shifts its location, the parent container must intercept the event, modify the character index boundaries against the immutable state, slice the raw text string, and pass a new array back down into the component input.</p><h3 id="the-parent-state-handler-workflow" tabindex="-1">The Parent State Handler Workflow <a class="header-anchor" href="#the-parent-state-handler-workflow" aria-label="Permalink to &quot;The Parent State Handler Workflow&quot;">​</a></h3><p>When a span edit occurs, the parent layer must perform a three-step orchestration:</p><ul><li><strong>Locate:</strong> Find the targeted FenominalSentence and FenominalHit using unique identifier spans.</li><li><strong>Re-calculate Boundaries:</strong> Apply the direction modifier step (in characters) to the targeted span.start or span.end.</li><li><strong>Re-segment Text:</strong> Re-slice the sentence&#39;s original_text into a clean, alternating sequence of text and hit tokens so that no character gaps or overlaps occur.</li></ul><h2 id="implementation-example-parent-container-service-controller" tabindex="-1">Implementation Example: Parent Container / Service Controller <a class="header-anchor" href="#implementation-example-parent-container-service-controller" aria-label="Permalink to &quot;Implementation Example: Parent Container / Service Controller&quot;">​</a></h2><p>Here is the concrete TypeScript algorithm to drop into your parent management layout to handle the re-segmentation logic cleanly:</p><p>\`typescript import { Injectable, signal } from &#39;@angular/core&#39;; import { FenominalSentence, FenominalSegment, FenominalHit } from &#39;./models&#39;;</p><p>@Injectable({ providedIn: &#39;root&#39; }) export class TextMiningStateService { // Master state storage holding the text mining source of truth public sentences = signal&lt;FenominalSentence[]&gt;([]);</p><p>/**</p><ul><li>Main entry point mapped to the component&#39;s (hitUpdated) output */ public handleHitUpdate(event: { action: string; sentence: FenominalSentence }): void { if (event.action === &#39;SPAN_BOUNDARIES_CHANGED&#39; || event.action === &#39;SPAN_POSITION_SHIFTED&#39;) { this.updateAndResegment(event.sentence); } }</li></ul><p>private updateAndResegment(updatedSentence: FenominalSentence): void { const rawText = updatedSentence.original_text;</p><pre><code>// 1. Extract the primary hit token that was altered
const targetHitSegment = updatedSentence.segments.find(s =&gt; s.kind === &#39;hit&#39;) as Extract&lt;FenominalSegment, { kind: &#39;hit&#39; }&gt;;
if (!targetHitSegment) return;

const { start, end } = targetHitSegment.hit.span;

// 2. Compute the brand new structural segments list
const adjustedSegments: FenominalSegment[] = [];

// Prefix block: text before the annotated term
if (start &gt; 0) {
  adjustedSegments.push({
    kind: &#39;text&#39;,
    text: rawText.substring(0, start),
    span: { start: 0, end: start }
  });
}

// Hit block: update the slice text string value to match new bounds
const updatedTermText = rawText.substring(start, end);
targetHitSegment.text = updatedTermText;
targetHitSegment.hit.label = updatedTermText; // Sync ontology target dictionary string
targetHitSegment.span = { start, end };

adjustedSegments.push(targetHitSegment);

// Suffix block: text after the annotated term
if (end &lt; rawText.length) {
  adjustedSegments.push({
    kind: &#39;text&#39;,
    text: rawText.substring(end),
    span: { start: end, end: rawText.length }
  });
}

// 3. Emit a completely immutable array reference to trigger Angular&#39;s OnPush change detection
this.sentences.update(allSentences =&gt;
  allSentences.map(s =&gt; s.start === updatedSentence.start ? { ...s, segments: adjustedSegments } : s)
);
</code></pre><p>} }</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## Integration into Parent Component Template</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Once this service state machine is configured, your parent orchestrator stays clean and simply pipelines the data downwards, avoiding any dirty local component state inside your UI library:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`typescript</span></span>
<span class="line"><span>&lt;lib-text-mining-container</span></span>
<span class="line"><span>  [sentences]=&quot;stateService.sentences()&quot;</span></span>
<span class="line"><span>  (hitUpdated)=&quot;stateService.handleHitUpdate($event)&quot;&gt;</span></span>
<span class="line"><span>&lt;/lib-text-mining-container&gt;</span></span></code></pre></div>`,17)])])}const g=t(i,[["render",r]]);export{h as __pageData,g as default};
