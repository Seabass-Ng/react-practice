import { useState } from "react";
import './CauseEffect.css';

const items = [{
  name: 'Alpha Bravo',
  street: '123 ABC St',
  city: 'Alberqueque, NM',
  country: 'USA',
  telephone: '123456789',
  birthday: '1/2/34'
}, {
  name: 'Charlie Delta',
  street: '123 BCD Ave',
  city: 'Boulder, Colorado',
  country: 'USA',
  telephone: '234567891',
  birthday: '2/3/45'
}, {
  name: 'Charlie',
  street: '123 CDE Blvd',
  city: 'Calgary, Alberta',
  country: 'Canada',
  telephone: '345678912',
  birthday: '3/4/56'
}, {
  name: 'Delta',
  street: '123 EFG Place',
  city: 'Dushanbe',
  country: 'Tajikistan',
  telephone: '456789123',
  birthday: '4/5/67'
}];

const CauseEffect = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  let selectedItem = null;
  if (selectedIndex !== null) {
    selectedItem = items[selectedIndex];
  }
  return (
    <div className="ceBody">
      <ul className="leftNav">
        {items.map((item, index) => (
          <li className={selectedIndex === index ? 'selected' : ''} onClick={() => setSelectedIndex(index)}>
            {item.name}
          </li>
        ))}
      </ul>
      {
        selectedItem && (
          <div className="rightPane">
            <div>
              Name:
            </div>
            <div>
              {selectedItem.name}
            </div>
            <div>
              Address:
            </div>
            <address>
              {selectedItem.street}, {selectedItem.city}, {selectedItem.country}
            </address>
            <div>
              Telephone:
            </div>
            <a href={`tel:${selectedItem.telephone}`}>
              {selectedItem.telephone}
            </a>
            <div>
              Birthday:
            </div>
            <div>
              {selectedItem.birthday}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default CauseEffect;