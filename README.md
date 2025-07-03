# Interactive Digital Plot Allocation System

A modern, responsive web application for managing and allocating estate plots with real-time visualization and interactive features.

## 🏗️ Features

### Core Functionality
- **Interactive Estate Map**: Visual representation using Nigeria map background with color-coded plot overlays
- **Real-time Plot Status**: 
  - 🟢 **Green**: Available plots
  - 🔴 **Red**: Sold plots  
  - 🟡 **Yellow**: Reserved plots
- **Plot Details**: Click any plot to view comprehensive information
- **Reservation System**: Reserve plots with client information
- **Purchase System**: Direct purchase functionality
- **Document Management**: Access to plot-related documents (Title Deed, Survey Plan, Building Permit)

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Statistics**: Live updates of plot availability and sales
- **Form Validation**: Comprehensive client information validation
- **Notifications**: User-friendly feedback for all actions

### Technical Features
- **Pure HTML/CSS/JavaScript**: No external dependencies required
- **Progressive Enhancement**: Works without JavaScript for basic viewing
- **Accessibility**: Keyboard navigation and screen reader support
- **Touch Support**: Optimized for mobile devices
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start exploring the estate layout!

### File Structure
```
plot-allocation-system/
├── index.html          # Main application file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
├── nigeria-map.jpg     # Nigeria map background image
└── README.md           # This documentation
```

## 📱 How to Use

### Viewing Plots
1. **Browse the Estate**: The main map shows all 25 plots overlaid on a Nigeria map background
2. **Understand Colors**: 
   - Green plots are available for purchase
   - Red plots have been sold
   - Yellow plots are reserved
3. **Interactive Map**: Plots are positioned strategically across the map for realistic estate visualization
4. **Estate Features**: The map includes roads, a central park, and main entrance

### Selecting a Plot
1. **Click on any available plot** (green or yellow)
2. **View details** in the right sidebar:
   - Plot ID and size
   - Price information
   - Current status
   - Available documents
3. **Take action**: Reserve or purchase the plot

### Reserving a Plot
1. Select an available plot
2. Click "Reserve Plot" button
3. Fill in client information:
   - Full Name
   - Email Address
   - Phone Number
   - ID Number
4. Click "Confirm" to reserve the plot

### Purchasing a Plot
1. Select an available or reserved plot
2. Click "Purchase Now" button
3. Fill in client information
4. Click "Confirm" to complete the purchase

### Viewing Statistics
- **Total Plots**: Overall count of all plots
- **Available**: Number of plots ready for purchase
- **Sold**: Number of completed sales
- **Reserved**: Number of plots under reservation

## 🎨 Customization

### Adding More Plots
Edit the `plot-grid` section in `index.html`:
```html
<div class="plot available" data-plot-id="F1" data-size="500sqm" data-price="150000">
    <span class="plot-label">F1</span>
</div>
```

### Modifying Plot Status
Change the CSS class to update status:
- `available` - Green, can be reserved/purchased
- `reserved` - Yellow, can be purchased
- `sold` - Red, no longer available

### Updating Prices
Modify the `data-price` attribute in the HTML:
```html
data-price="175000"
```

### Customizing Colors
Edit the CSS variables in `styles.css`:
```css
.plot.available {
    background: linear-gradient(135deg, #48bb78, #38a169);
}
```

## 🔧 Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight: No external dependencies
- Fast loading: Optimized CSS and JavaScript
- Smooth animations: Hardware-accelerated transitions

### Security Features
- Client-side form validation
- XSS protection through proper DOM manipulation
- No sensitive data storage (demo purposes)

## 📊 Sample Data

The application includes 25 sample plots with realistic data:

| Plot ID | Size | Price | Status |
|---------|------|-------|--------|
| A1 | 500sqm | $150,000 | Available |
| A2 | 600sqm | $180,000 | Sold |
| A3 | 550sqm | $165,000 | Available |
| ... | ... | ... | ... |

## 🚀 Future Enhancements

### Potential Features
- **Backend Integration**: Connect to a real database
- **User Authentication**: Admin and client login systems
- **Payment Processing**: Integration with payment gateways
- **Email Notifications**: Automated confirmation emails
- **Advanced Filtering**: Search and filter plots by criteria
- **Export Functionality**: Generate reports and documents
- **Multi-language Support**: Internationalization
- **Dark Mode**: Alternative color scheme

### Technical Improvements
- **PWA Support**: Make it installable as a mobile app
- **Offline Capability**: Service worker for offline access
- **Real-time Updates**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed reporting and insights

## 🤝 Contributing

This is a demonstration project. For production use, consider:

1. **Security Review**: Implement proper authentication and authorization
2. **Data Validation**: Add server-side validation
3. **Error Handling**: Comprehensive error management
4. **Testing**: Unit and integration tests
5. **Documentation**: API documentation for backend integration

## 📄 License

This project is for demonstration purposes. Feel free to use and modify for your own projects.

## 🆘 Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure all files are in the same directory
3. Verify you're using a modern web browser
4. Try refreshing the page if interactions don't work

---

**Built with ❤️ using HTML, CSS, and JavaScript** 