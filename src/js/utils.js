export function createElement(tag, options, parent) {
    const element = document.createElement(tag);
    options = options || {};
    if (options.dataset) {
        for (let o in options.dataset) {
            element.dataset[o] = options.dataset[o];
        }
        delete(options.dataset);
    }
    if (options.classList) {
        const cl = Array.isArray(options.classList) ? options.classList : [options.classList];
        element.classList.add.apply(element.classList, cl);
        delete(options.classList);
    }
    Object.assign(element, options);
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}