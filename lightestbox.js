(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            root.lightestbox = factory(root);
        });
    } else {
        root.lightestbox = factory(root);
    }
}(typeof self !== 'undefined' ? self : this, function (window) {
    let d = document,
        qs = 'querySelector',
        qsa = 'querySelectorAll',
        on = 'addEventListener',
        cls = 'classList',
        attr = 'getAttribute',
        html = 'innerHTML',
        css = 'style';

    let container = d.createElement('div');
    container[html] = `<style>@keyframes zoomIn{from{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes zoomOut{from{opacity:1}50%{opacity:0;transform:scale3d(.3,.3,.3)}to{opacity:0}}.animate__zoomIn{animation-name:zoomIn;animation-duration:.8s}.animate__zoomOut{animation-name:zoomOut;animation-duration:.4s}#codex-tinybox{display:none;flex-direction:column;position:fixed;z-index:4444;background-color:rgba(0,0,0,.9);top:0;left:0;width:100%;height:100%;align-items:center;justify-content:center}#lightestbox img{z-index:5555;max-width:90%;max-height:80%;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);border-radius:6px}#codex-tinybox div{color:#fff;margin-top:10px}</style><div id=lightestbox><img><div></div></div>`;

    d.body.append(container);
    container = d[qs]('#lightestbox');
    let img = d[qs]('#lightestbox img');
    let caption = d[qs]('#lightestbox div');

    container[on]('click', function () {
        caption.style.visibility = 'hidden';
        img[cls].remove('animate__zoomIn');
        img[cls].add('animate__zoomOut');
        setTimeout(function () {
            d.body.parentElement.style.overflow = 'initial';
            container.style.display = 'none';
        }, 300);
    });

    img[on]('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
    });

    d[qsa]('[data-fancybox]').forEach(function (el) {
        el[on]('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            d.body.parentElement[css].overflow = 'hidden';
            container[css].display = 'flex';
            img.src = this.getAttribute('href');
            img[cls].remove('animate__zoomOut');
            img[cls].add('animate__zoomIn');
            caption[html] = this.getAttribute('data-caption');
            caption[css].visibility = 'hidden';
            setTimeout(function () {
                caption[css].visibility = 'visible';
            }, 1000);
        });
    });

    return true;
}));