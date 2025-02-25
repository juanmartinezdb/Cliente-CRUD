import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  template: '<div id="map"></div>',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() latitude: number = 36.69569507643647;
  @Input() longitude: number = -4.457026720046998;
  @Input() isEditable: boolean = false;

  @Output() locationChanged = new EventEmitter<{ latitude: number; longitude: number }>();

  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
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

    this.marker = L.marker([this.latitude, this.longitude], {
      icon,
      draggable: this.isEditable
    }).addTo(this.map)
      .bindPopup('Players are reunited here')
      .openPopup();

    if (this.isEditable) {
      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.locationChanged.emit({ latitude: position.lat, longitude: position.lng });
      });

      this.map.on('click', (event: L.LeafletMouseEvent) => {
        this.marker.setLatLng(event.latlng);
        this.locationChanged.emit({ latitude: event.latlng.lat, longitude: event.latlng.lng });
      });
    }
  }
}
