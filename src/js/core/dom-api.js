function setAttrs(attrs, el) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

export function createEl(tagName) {
    
    return (attrs, template) => {
        
        let element = document.createElement(tagName);
        setAttrs(attrs, element);
        
        if (template && template.length) {
            template = document.createRange().createContextualFragment(template);
            element.appendChild(template);
        }
        
        return element;
    }

}

export const article = createEl("li");