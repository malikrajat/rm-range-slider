import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RmRangeSliderComponent, MINMAX } from 'rm-range-slider';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-basic-usage',
  standalone: true,
  imports: [CommonModule, RmRangeSliderComponent],
  template: `
    <div class="example-container">
      <h2>Price Range Filter</h2>
      <p class="description">
        A simple implementation of a price filter using the <code>rm-range-slider</code>.
      </p>

      <div class="slider-box">
        <label class="slider-label">
          Price Range: <strong>${{ range.min }} - ${{ range.max }}</strong>
        </label>
        
        <rm-range-slider
          [min]="0"
          [max]="1000"
          [startValue]="range.min"
          [endValue]="range.max"
          (onValueChanged)="onPriceChanged($event)"
        ></rm-range-slider>
      </div>

      <div class="product-grid">
        <div *ngFor="let product of filteredProducts" class="product-card">
          <span class="product-name">{{ product.name }}</span>
          <span class="product-price">${{ product.price }}</span>
        </div>
        
        <div *ngIf="filteredProducts.length === 0" class="empty-state">
          No products found in this range.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .example-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 24px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      font-family: 'Inter', sans-serif;
    }
    h2 { margin: 0 0 8px; color: #1a1a1a; }
    .description { color: #666; font-size: 14px; margin-bottom: 32px; }
    .slider-box { margin-bottom: 40px; }
    .slider-label { display: block; margin-bottom: 12px; color: #333; }
    .product-grid { display: grid; gap: 12px; }
    .product-card {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #eee;
    }
    .product-name { font-weight: 500; }
    .product-price { color: #2e7d32; font-weight: 700; }
    .empty-state { text-align: center; padding: 20px; color: #999; font-style: italic; }
  `]
})
export class BasicUsageComponent {
  range: MINMAX = { min: 100, max: 600 };

  products: Product[] = [
    { id: 1, name: 'Wireless Mouse', price: 45 },
    { id: 2, name: 'Mechanical Keyboard', price: 120 },
    { id: 3, name: '27" Monitor', price: 350 },
    { id: 4, name: 'USB-C Hub', price: 60 },
    { id: 5, name: 'Noise Cancelling Headphones', price: 299 },
    { id: 6, name: 'Webcam 4K', price: 199 },
  ];

  get filteredProducts(): Product[] {
    return this.products.filter(
      p => p.price >= this.range.min && p.price <= this.range.max
    );
  }

  onPriceChanged(newRange: MINMAX): void {
    this.range = newRange;
  }
}
