export class Nav {

    constructor (el) {
        this.nav = el;
        this.links = this.nav.querySelectorAll(".nav-link");

        this.init();
    }

    init () {
        this._events();
    }

    _events () {

        this.links.forEach(link => {
            
            link.addEventListener("click", (ev) => {
                
                ev.preventDefault();
                let href = ev.target.getAttribute("href");

                history.pushState({}, "prueba", href);
                
                // let event = new CustomEvent("route", { bubbles: true, cancelable: true, detail: href})
                // this.nav.dispatchEvent(event);
                
            });

        });

    }

}