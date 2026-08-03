// The plugin ships no type declarations, so describe the bits we use.
declare module "photoswipe-dynamic-caption-plugin" {
  import type PhotoSwipeLightbox from "photoswipe/lightbox";

  type CaptionSlide = { data: { element?: HTMLElement } };

  type DynamicCaptionOptions = {
    type?: "auto" | "below" | "aside";
    captionContent?: string | ((slide: CaptionSlide) => string);
    horizontalEdgeThreshold?: number;
    mobileCaptionOverlapRatio?: number;
    mobileLayoutBreakpoint?: number | (() => boolean);
    verticallyCenterImage?: boolean;
  };

  export default class PhotoSwipeDynamicCaption {
    constructor(lightbox: PhotoSwipeLightbox, options?: DynamicCaptionOptions);
  }
}
