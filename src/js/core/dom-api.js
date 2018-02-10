function setAttrs(attrs, el) {
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
}

export function createEl(tagName) {
    
    return (attrs, template) => {
        
        let element = document.createElement(tagName);
        
        if (attrs) {
            setAttrs(attrs, element);
        }
        
        if (template && template.length) {
            template = document.createRange().createContextualFragment(template);
            element.appendChild(template);
        }
        
        return element;
    }

}

export function clearMainView() {
    document.querySelector(".app-content").innerHTML = "";
}

export const header = createEl("header");
export const list = createEl("ul");
export const article = createEl("article");
export const div = createEl("div");
export const boton = createEl("button");