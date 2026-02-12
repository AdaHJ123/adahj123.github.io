# Functions Maintenance

This document stores maintenance notes for multiple project functions.

## Function: Project Detail Lightbox Zoom/Pan

This section explains the zoom/pan behavior for project detail images in the lightbox.

### 1) Scope

- Feature: open detail image -> wheel zoom -> drag pan -> close/reset.
- Main file: `src/pages/ProjectDetail.vue`
- Style file: `src/project-detail-style.css`

### 2) Current User Experience

- Click a detail thumbnail to open lightbox image.
- Use mouse wheel to zoom in/out.
- Click left mouse button to zoom by step:
  - zoom in before max scale
  - zoom out after max scale is reached
- Max zoom is limited to image "real size" (1:1 pixel mapping), not infinite.
- When zoomed in (`scale > 1`), press and drag to pan.
- Press `Esc` or click overlay to close lightbox.
- Reopen lightbox starts from default state (no stale zoom/pan from previous image).

### 3) Key Template Hooks

In `src/pages/ProjectDetail.vue`, the lightbox image binds these events:

- `@load="onLightboxImageLoad"`: recalculate max zoom after image is rendered.
- `@wheel.prevent="onLightboxWheel"`: handle wheel zoom and prevent page scroll.
- `@click="onLightboxClick"`: click-to-zoom with direction switch at max scale.
- `@pointerdown="onLightboxPointerDown"`: start pan interaction.
- `@dragstart.prevent`: disable browser default image drag ghost.

### 4) State Variables (Why They Exist)

In `src/pages/ProjectDetail.vue`:

- `lightboxElement`: lightbox container DOM ref. Used to read viewport size.
- `lightboxImageElement`: image DOM ref. Used to read natural/rendered size.
- `minLightboxScale`: minimum zoom (currently `1`).
- `lightboxScale`: current zoom scale.
- `lightboxMaxScale`: dynamic max scale computed from natural/rendered size.
- `lightboxPanX`, `lightboxPanY`: current translation offset.
- `isPanningLightbox`: whether pointer-drag pan is active.
- `panPointerId`: tracks which pointer started the drag.
- `panStartX`, `panStartY`: pointer position at drag start.
- `panOriginX`, `panOriginY`: image pan offset at drag start.

### 5) Core Functions

- `resetLightboxInteraction()`
  - Resets zoom/pan/pan-state when opening/closing.

- `refreshLightboxMaxScale()`
  - Computes max scale from natural vs rendered image size.
  - Re-clamps current scale and pan if needed.

- `onLightboxImageLoad()`
  - Calls max-scale calculation after render (`requestAnimationFrame`).

- `onLightboxWheel(event)`
  - Computes new scale from wheel input.
  - Uses pointer-centered zoom math so image does not jump unexpectedly.
  - Re-clamps pan under new scale.

- `onLightboxPointerDown/Move/Up()`
  - Handles drag-pan only when zoomed in (`scale > 1`).

- `clampPanToViewport(x, y, scale)`
  - Keeps pan bounded so image cannot be dragged far outside visible area.

- `lightboxImageStyle`
  - Single render source for image transform/cursor/transition.

### 6) Critical Formulas

#### 6.1 Max Zoom (Real-Size Limit)

`realSizeScale = max(1, naturalWidth / renderedWidth, naturalHeight / renderedHeight)`

Meaning:
- `scale = 1` => lightbox initial fitted display.
- `scale = realSizeScale` => image reaches real pixel density (100%).

#### 6.2 Pointer-Centered Wheel Zoom

`nextScale = clamp(currentScale * exp(-deltaY * k), minScale, maxScale)`

Then update pan so the point under cursor remains visually anchored:

- `nextPanX = pointerX - ((pointerX - currentPanX) / currentScale) * nextScale`
- `nextPanY = pointerY - ((pointerY - currentPanY) / currentScale) * nextScale`

#### 6.3 Pan Boundary Clamp

- `maxX = max(0, (scaledWidth - viewportWidth) / 2)`
- `maxY = max(0, (scaledHeight - viewportHeight) / 2)`
- `panX = clamp(panX, -maxX, maxX)`
- `panY = clamp(panY, -maxY, maxY)`

### 7) Lifecycle and Global Listeners

- Registered on mount:
  - `keydown` (Esc close)
  - `resize` (recompute max scale)
  - `pointermove/pointerup/pointercancel` (pan tracking)
- Removed on unmount:
  - all above listeners
  - body overflow lock cleanup

Maintenance rule:
- If adding new global listeners for lightbox, always register/unregister symmetrically.

### 8) CSS Contract (Do Not Remove Lightly)

In `src/project-detail-style.css`:

- `.lightbox { overflow: hidden; }`
  - Required so panned/zoomed content does not spill outside overlay.

- `.lightbox img { transform-origin: center center; }`
  - Keeps transform math consistent with JS.

- `.lightbox img { touch-action: none; }`
  - Prevents browser default touch gestures from hijacking custom pan/zoom handling.

- `.lightbox img { user-select: none; -webkit-user-drag: none; }`
  - Avoids drag ghost and accidental text/image selection during pan.

### 9) Safe Tuning Checklist

When changing zoom behavior:

- If zoom feels too fast/slow, tune wheel factor `k` in `onLightboxWheel` (`0.0015` currently).
- If users want zoom beyond real size, increase max scale policy in `refreshLightboxMaxScale`.
- If panning feels too constrained/loose, adjust `clampPanToViewport`.
- Keep `@wheel.prevent`; removing it usually causes page scroll conflicts.

### 10) Common Issues and Debug Tips

- Symptom: wheel zoom does nothing.
  - Check `lightboxMaxScale` calculation and whether image load fired.

- Symptom: image jumps while zooming.
  - Check pointer-centered pan math in `onLightboxWheel`.

- Symptom: drag causes browser ghost image.
  - Confirm `@dragstart.prevent` exists on `<img>`.

- Symptom: touch drag is inconsistent on mobile.
  - Confirm `touch-action: none` is still present in lightbox image CSS.

### 11) References (Primary Docs)

- MDN `wheel` event: https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
- MDN `WheelEvent.deltaY`: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY
- MDN `WheelEvent.deltaMode`: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
- MDN `Event.preventDefault`: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
- MDN Pointer Events: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
- MDN `touch-action`: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
- MDN `naturalWidth`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth
- MDN `naturalHeight`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight
- MDN `clientWidth`: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
- MDN `clientHeight`: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
- MDN `transform`: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
- MDN `transform-origin`: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
- MDN `dragstart`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event
- Vue Event Handling: https://vuejs.org/guide/essentials/event-handling.html
- Vue Template Refs: https://vuejs.org/guide/essentials/template-refs
