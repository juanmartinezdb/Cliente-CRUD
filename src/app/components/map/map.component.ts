import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @Input() latitude: number = 36.69569507643647;
  @Input() longitude: number = -4.457026720046998;
  @Input() isEditable: boolean = false;

  @Output() locationChanged = new EventEmitter<{ latitude: number; longitude: number }>();

  private map!: L.Map;
  private marker!: L.Marker;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);

    const icon = L.icon({
      iconUrl: '/marker2.png',
      shadowUrl: 'marker2shadow.png',
      iconSize: [90, 100],
      shadowSize: [141, 56],
      iconAnchor: [42, 94],
      shadowAnchor: [10, 55],
      popupAnchor: [14, -76]
    });

    this.marker = L.marker([this.latitude, this.longitude], {icon}).addTo(this.map).bindPopup('Players are reunited here');

    if (this.isEditable) {
      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.marker.setLatLng(event.latlng);
        this.locationChanged.emit({ latitude: event.latlng.lat, longitude: event.latlng.lng });
      });
    }
  }
}
