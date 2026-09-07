import React from 'react';
import ceillingMountImg from '../assets/Ceilling.png'; 
import tableMountImg from '../assets/Table.png';
import wheelMountImg from '../assets/Wheel.png';

const CAMERA_MOUNTS = [
  {
    id: 'Wheel Mount',
    title: 'Wheel Mount',
    description: 'Kamera direkt am FS593 integriert.',
    image: wheelMountImg,
  },
  {
    id: 'Ceilling Mount',
    title: 'Ceilling Mount',
    description: 'Wandmontage - Kamera hängt von der Decke. - Maximale Deckenhöhe 8M',
    image: ceillingMountImg,
  },
  {
    id: 'Table Mount',
    title: 'Table Mount',
    description: 'Montage für Tischhalterung - Achtung Löcher müssen gebohrt werden.',
    image: tableMountImg,
  },
];

export default function KameraSet({ mount, onMountChange }) {
  return (
    <div className="terminal-image-grid">
      {CAMERA_MOUNTS.map((item) => {
        const isSelected = mount === item.id;
        return (
          <div
            key={item.id}
            className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onMountChange(item.id)}
          >
            <div className="img-wrapper">
              <img src={item.image} alt={item.title} className="terminal-img" />
            </div>
            <span className="terminal-name">{item.title}</span>
            <p className="card-subtext">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}