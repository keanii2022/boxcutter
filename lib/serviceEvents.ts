// Bespoke cross-component wiring, matching this codebase's existing pattern
// of independent components talking through the DOM instead of a shared
// state library (see ToDoList.tsx's --sc-p read). ServicesCarousel fires
// this once per card the reader actually opens; ToDoList listens and checks
// the matching step off — a checkmark earned by real interaction instead of
// a guessed scroll fraction.
export const SERVICE_OPENED_EVENT = "boxcutter:service-opened";
