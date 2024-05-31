// violationMap.js
import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import MapLibre from '@salesforce/resourceUrl/maplibre';

export default class MyComponent extends LightningElement {
    renderedCallback() {
        Promise.all([
            // MapLibre GL JS kütüphanesini yükleyin
            loadScript(this, MapLibre + '/maplibre-gl.js'),
            // MapLibre GL JS stillerini yükleyin (isteğe bağlı)
            loadStyle(this, MapLibre + '/maplibre-gl.css')
        ])
        .then(() => {
            // Kütüphane yüklendikten sonra harita oluşturmak veya diğer işlemleri gerçekleştirin
            this.initializeMap();
        })
        .catch(error => {
            console.error('Error loading MapLibre GL JS', error);
        });
    }

    initializeMap() {
       // Harita oluşturmak için gerekli kodu buraya ekleyin
       const map = new maplibregl.Map({
        container: this.template.querySelector('.map'),
        style: 'https://api.maptiler.com/maps/streets/style.json?key=e0F8fikrXN4HlBhQz3sp',
        zoom: 0.1
        // Diğer harita özellikleri buraya eklenebilir
    });

    // Harita özelliklerini daha fazla özelleştirmek için buraya ek kod ekleyebilirsiniz
    // Örneğin, işaretleyicileri ekleyebilir veya harita olaylarını dinleyebilirsiniz
    this.map = map;
    }
}
