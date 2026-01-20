# Contract Manager

A modern web application for creating, managing, and tracking contracts using customizable blueprints with drag-and-drop field positioning.

🌐 **Live Demo**: [https://cm-assignment-dusky.vercel.app/](https://cm-assignment-dusky.vercel.app/)

## 📋 Overview

Contract Manager is a comprehensive solution for managing contracts through a blueprint-based system. Create reusable blueprints with custom fields, position them on an A4 canvas, and generate contracts with complete tracking and status management.

## ✨ Features

### Blueprint Management
- **Visual Designer**: Drag-and-drop interface to position fields on an A4 canvas (794px × 1123px)
- **Field Types**: Support for text, date, checkbox, and signature (image upload) fields
- **Color-Coded Fields**: Visual distinction between field types with a legend
- **Persistent Positioning**: Field positions are saved and maintained across sessions
- **Search & Filter**: Quick search functionality to find blueprints
- **View & Delete**: Preview blueprints in read-only mode or remove them

### Contract Management
- **Blueprint-Based Creation**: Select from existing blueprints to create contracts
- **Value Entry**: Fill in all blueprint fields with actual contract data
- **Signature Upload**: Upload signature images (converted to base64) with 1.5cm × 3cm dimensions
- **A4 Document Preview**: Real-time preview of the contract as a formatted A4 document
- **Status Tracking**: Visual workflow tracker with 5 stages
- **Status Workflow**: 
  - Created → Approved → Sent → Signed → Locked
  - Revokable at Created or Sent stages
- **Simplified Status Display**: 
  - **Active** (Created/Approved)
  - **Pending** (Sent)
  - **Signed** (Signed/Locked)
  - **Revoked**
- **Print to PDF**: Browser-native print functionality to export contracts as PDF

### User Experience
- **Toast Notifications**: Modern toast messages for success and error feedback
- **Confirmation Modals**: Clean modal dialogs for destructive actions
- **Fixed Sidebar**: Always-accessible navigation
- **Responsive Tables**: Organized data display with search and filtering
- **Action Buttons**: Quick access to view, change status, and delete operations

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: TailwindCSS 3.4.19
- **Routing**: React Router DOM 7.12.0
- **Icons**: React Icons 5.5.0
- **Notifications**: React Hot Toast 2.6.0
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Data Persistence**: localStorage (browser-native)
- **Image Handling**: FileReader API for base64 conversion

## 📦 Setup Instructions

### Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js**: Version 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: Comes bundled with Node.js (v9+ recommended)
- **Git**: For version control (optional)
- **Modern Web Browser**: Chrome, Firefox, Edge, or Safari

### Installation Steps

1. **Extract or Clone the Project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd contract-manager
   
   # OR if you have a zip file
   # Extract the contract-manager folder and navigate to it
   cd contract-manager
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   
   This will install all required packages including:
   - React and React DOM
   - TypeScript
   - Vite (build tool)
   - TailwindCSS (styling)
   - React Router DOM (routing)
   - React Hot Toast (notifications)
   - React Icons
   - All dev dependencies

3. **Verify Installation**
   ```bash
   npm run lint
   ```
   This ensures all dependencies are correctly installed and there are no configuration issues.

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Expected output:
   ```
   VITE v7.2.4  ready in XXX ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  press h + enter to show help
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The application should load with the sidebar navigation
   - You'll see "Contracts" page by default (empty state)

6. **Verify Application is Working**
   - Click "Blueprints" in sidebar
   - Click "New Blueprint" button
   - If the modal opens, the application is working correctly

### Building for Production

1. **Create Production Build**
   ```bash
   npm run build
   ```
   
   This creates an optimized bundle in the `dist/` folder.

2. **Preview Production Build**
   ```bash
   npm run preview
   ```
   
   Opens the production build at `http://localhost:4173`

3. **Deploy**
   - Upload the contents of the `dist/` folder to any static hosting service
   - Supports: Netlify, Vercel, GitHub Pages, AWS S3, etc.

### Troubleshooting Setup

**Issue**: `npm install` fails with dependency errors
- **Solution**: Delete `node_modules` folder and `package-lock.json`, then run `npm install` again
- Try using Node.js LTS version

**Issue**: Port 5173 already in use
- **Solution**: Kill the process using that port or Vite will automatically use the next available port

**Issue**: TypeScript errors during build
- **Solution**: Run `npm run lint` to identify issues, ensure TypeScript version is compatible

**Issue**: Vite not found
- **Solution**: Run `npm install -g vite` or use `npx vite` instead

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
contract-manager/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and static files
│   ├── components/           # Reusable components
│   │   ├── ConfirmModal.tsx  # Confirmation dialog component
│   │   ├── DraggableField.tsx # Draggable field component
│   │   └── SideBar/          # Navigation sidebar
│   ├── hooks/                # Custom React hooks
│   │   └── useDraggable.ts   # Drag-and-drop logic hook
│   ├── pages/                # Page components
│   │   ├── Blueprint/
│   │   │   ├── Blueprints.tsx         # Blueprint list page
│   │   │   ├── CreateBlueprint.tsx    # Blueprint creation page
│   │   │   └── ViewBlueprint.tsx      # Blueprint view page
│   │   └── Contract/
│   │       ├── AllContracts.tsx       # Contract list page
│   │       ├── CreateContract.tsx     # Contract creation page
│   │       └── ViewContract.tsx       # Contract view page
│   ├── storage/              # Data persistence utilities
│   │   └── db.ts             # localStorage wrapper functions
│   ├── types/                # TypeScript type definitions
│   │   ├── blueprint.types.ts # Blueprint and FormField types
│   │   └── contracts.types.ts # Contract type definitions
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles and Tailwind imports
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # TailwindCSS configuration
└── README.md                 # This file
```

## 📖 Usage Guide

### Creating a Blueprint

1. Navigate to **Blueprints** from the sidebar
2. Click **New Blueprint** button
3. Click **Add Field** to open the field modal
4. Enter field label and select type (text, date, checkbox, signature)
5. Click **Add** - field appears on the A4 canvas
6. Drag fields to desired positions on the canvas
7. Add more fields as needed
8. Click **Save Blueprint**
9. Enter blueprint name and optional description
10. Click **Save** - redirects to blueprints list

### Creating a Contract

1. Navigate to **Contracts** from the sidebar
2. Click **New Contract** button
3. Select a blueprint from the dropdown
4. Contract name auto-fills (editable)
5. Fill in values for each field:
   - **Text fields**: Enter text
   - **Date fields**: Select from date picker
   - **Checkbox fields**: Check/uncheck
   - **Signature fields**: Upload image file
6. View live preview on the right side (A4 document)
7. Click **Save Contract**
8. Contract is created with "Created" status

### Managing Contract Status

1. Open a contract from the contracts list
2. View the status tracker showing current progress
3. Click **Update to [Next Status]** to move forward
4. Click **Revoke Contract** (only available at Created/Sent stages)
5. Status updates are saved automatically
6. Locked contracts cannot be modified

### Viewing and Printing Contracts

1. Click **View** (eye icon) on any contract
2. See contract details and status tracker
3. View A4 document preview with all field values
4. Click **Print to PDF** button (if implemented)
5. Use browser's print dialog to save as PDF

### Deleting Items

1. Click **Delete** (trash icon) on blueprint or contract
2. Confirmation modal appears
3. Click **Delete** to confirm or **Cancel** to abort
4. Success toast notification appears

## 💾 Data Storage

All data is stored in **browser localStorage**:

- **Blueprints**: Stored with key pattern `blueprint_{id}`
- **Contracts**: Stored with key pattern `contract_{id}`
- **Format**: JSON serialized objects
- **Persistence**: Data persists across browser sessions
- **Limitations**: 
  - Storage limit ~5-10MB (browser dependent)
  - Data is local to the browser/device
  - Clearing browser data will delete all records

### Data Backup

To backup data manually:
1. Open browser DevTools (F12)
2. Go to Application/Storage → Local Storage
3. Copy all contract-manager keys and values
4. Save to external file

## 🎨 Field Types

| Type | Description | Default Size | Color |
|------|-------------|--------------|-------|
| Text | Single-line text input | 200×35px | Blue |
| Date | Date picker | 160×35px | Green |
| Checkbox | Boolean checkbox | 140×35px | Purple |
| Signature | Image upload (base64) | 240×50px (displays as 113×57px) | Orange |

## 📐 A4 Specifications

- **Canvas Dimensions**: 794px × 1123px (at 96 DPI)
- **Physical Size**: 210mm × 297mm
- **Print Settings**: A4 page size, no margins
- **Field Positioning**: Pixel-perfect positioning preserved in print

## 🔄 Contract Status Workflow

```
Created → Approved → Sent → Signed → Locked
   ↓                    ↓
Revoked ←──────────────┘

Display Status Mapping:
- Active: Created, Approved
- Pending: Sent
- Signed: Signed, Locked
- Revoked: Revoked
```

## � Architecture and Design Decisions

### Application Architecture

The application follows a **Component-Based Architecture** using React with TypeScript, organized into clear layers:

```
┌─────────────────────────────────────────────┐
│          User Interface Layer               │
│   (Pages, Components, Modals, Toasts)       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│        Business Logic Layer                 │
│  (Hooks, State Management, Event Handlers)  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Data Persistence Layer              │
│       (localStorage, db.ts utilities)       │
└─────────────────────────────────────────────┘
```

### Key Design Decisions

#### 1. **Client-Side Only Architecture**
- **Decision**: Build as a pure frontend application with no backend
- **Rationale**: 
  - Faster prototyping and development
  - No server infrastructure required
  - Instant data access without API latency
  - Suitable for single-user, local document management
- **Trade-off**: Cannot support multi-user collaboration or cloud sync

#### 2. **localStorage for Data Persistence**
- **Decision**: Use browser's localStorage API for all data storage
- **Rationale**:
  - Simple implementation without database setup
  - Native browser support, no external dependencies
  - Synchronous API for predictable data operations
  - Data persists across browser sessions
- **Trade-off**: 
  - Limited storage (~5-10MB)
  - Data not accessible across devices
  - No backup/restore functionality
  - Vulnerable to browser data clearing

#### 3. **Blueprint-Contract Pattern**
- **Decision**: Separate blueprints (templates) from contracts (instances)
- **Rationale**:
  - Reusability - create multiple contracts from one blueprint
  - Consistency - ensure all contracts follow the same structure
  - Efficiency - define field positions once, reuse many times
  - Flexibility - modify blueprint without affecting existing contracts
- **Implementation**: Contracts store `blueprintId` reference and copy of fields with values

#### 4. **Drag-and-Drop Field Positioning**
- **Decision**: Use custom drag-and-drop hook instead of external libraries
- **Rationale**:
  - `react-draggable` deprecated/incompatible with React 19
  - Custom implementation provides precise control
  - No additional dependencies
  - Better performance for our specific use case
- **Implementation**: 
  - `useDraggable` hook manages mouse events
  - Canvas-relative positioning
  - Boundary checking to keep fields within A4 canvas

#### 5. **A4 Canvas Standard**
- **Decision**: Fix canvas to A4 paper dimensions (794×1123px at 96 DPI)
- **Rationale**:
  - Matches real-world document size
  - Print-friendly layout
  - Predictable field positioning
  - Professional document appearance
- **Implementation**: Pixel-perfect positioning that translates to print

#### 6. **React Router for Navigation**
- **Decision**: Use client-side routing with React Router DOM v7
- **Rationale**:
  - SPA experience without page reloads
  - Clean URL structure
  - Supports browser back/forward navigation
  - Easy to add new routes
- **Routes**:
  - `/contracts` - Contract list
  - `/contracts/create` - New contract form
  - `/contracts/view/:id` - Contract details
  - `/blueprints` - Blueprint list
  - `/blueprints/create` - Blueprint designer
  - `/blueprints/view/:id` - Blueprint preview

#### 7. **TypeScript for Type Safety**
- **Decision**: Use TypeScript throughout the application
- **Rationale**:
  - Catch errors at compile time
  - Better IDE support and autocomplete
  - Self-documenting code
  - Easier refactoring
- **Types**: Centralized in `types/` folder

#### 8. **TailwindCSS for Styling**
- **Decision**: Use utility-first CSS framework
- **Rationale**:
  - Rapid UI development
  - Consistent design system
  - No CSS naming conflicts
  - Built-in responsive utilities
  - Small bundle size with purging
- **Customization**: Extended with custom colors in `tailwind.config.ts`

#### 9. **Component Composition**
- **Decision**: Create reusable components (ConfirmModal, DraggableField, etc.)
- **Rationale**:
  - DRY principle (Don't Repeat Yourself)
  - Consistent UI patterns
  - Easier maintenance
  - Testability
- **Strategy**: Split UI into logical, reusable pieces

#### 10. **Status Workflow System**
- **Decision**: Implement linear workflow with revoke option
- **Rationale**:
  - Mirrors real-world contract processes
  - Clear progression path
  - Audit trail (status history via updatedAt)
  - Prevents accidental modifications (locked state)
- **Workflow**: Created → Approved → Sent → Signed → Locked (+ Revoked)

#### 11. **Base64 for Signature Images**
- **Decision**: Convert uploaded images to base64 strings
- **Rationale**:
  - No file storage infrastructure needed
  - Images embedded directly in contract data
  - Portable - contract contains all data
  - Works with localStorage
- **Trade-off**: Increases storage size, limited to smaller images

#### 12. **Toast Notifications + Modals**
- **Decision**: Use react-hot-toast for feedback, custom modals for confirmations
- **Rationale**:
  - Better UX than native `alert()` and `confirm()`
  - Non-blocking notifications
  - Consistent design
  - Accessible and customizable
- **Implementation**: Toaster in root, modals per component

### State Management Strategy

- **Local State**: useState for component-specific state
- **Shared State**: Props passing for parent-child communication
- **Derived State**: useMemo for computed values
- **Side Effects**: useEffect for data loading and subscriptions
- **No Global State**: Application is simple enough to not require Redux/Context

### File Organization

```
/src
  /components     - Reusable UI components
  /hooks          - Custom React hooks (business logic)
  /pages          - Route-level components
  /types          - TypeScript interfaces
  /storage        - Data layer utilities
```

**Rationale**: Clear separation of concerns, easy to navigate, scalable structure

### Performance Optimizations

1. **Lazy Loading**: Routes could be code-split (not implemented yet)
2. **useMemo**: Prevent unnecessary recalculations (selectedBlueprint)
3. **Event Delegation**: Single event handler for multiple items
4. **Debouncing**: Search input could be debounced (future enhancement)
5. **Virtual Scrolling**: For large lists (future enhancement)

### Security Considerations

- **No Authentication**: Application is client-side only
- **No Encryption**: Data stored in plain text in localStorage
- **XSS Protection**: React's built-in escaping prevents XSS
- **Input Validation**: Basic validation on required fields
- **Note**: Not suitable for sensitive data without backend implementation

### Testing Strategy (Not Implemented)

**Recommended approach:**
- Unit tests: Components with Jest + React Testing Library
- Integration tests: User flows with Cypress
- Type checking: TypeScript compiler
- Linting: ESLint for code quality

## � Assumptions and Limitations

### Assumptions

#### User Environment
1. **Modern Browser**: Users have access to a modern browser (Chrome, Firefox, Safari, Edge) released within the last 2 years
2. **JavaScript Enabled**: Browser has JavaScript enabled
3. **localStorage Available**: Browser supports localStorage (not in private/incognito mode limitations)
4. **Screen Resolution**: Users have at least 1280x720 resolution for optimal viewing
5. **Single Device**: User works on a single device (no cross-device sync needed)

#### Usage Patterns
6. **Single User**: Application is used by one person at a time
7. **English Language**: All UI text is in English only
8. **Small Scale**: User manages fewer than 100 blueprints and 500 contracts
9. **Occasional Use**: Not designed for high-frequency transaction processing
10. **Trust Environment**: User trusts their browser and device security

#### Data
11. **Non-Sensitive Data**: Contracts don't contain highly sensitive or regulated information
12. **No Compliance Requirements**: No GDPR, HIPAA, or other regulatory compliance needed
13. **Local Data Acceptable**: User accepts data is stored locally and not backed up
14. **Image Size**: Signature images are under 2MB
15. **Field Count**: Blueprints have fewer than 50 fields

#### Technical
16. **Internet for Initial Load**: Internet connection required for first load (to fetch dependencies)
17. **No Offline Mode**: Application doesn't need to work completely offline after initial load
18. **Print Capability**: User's browser supports window.print() API
19. **Date Format**: US date format (MM/DD/YYYY) is acceptable
20. **No Accessibility Requirements**: WCAG compliance not required (though basic accessibility is implemented)

### Known Limitations

#### Data Storage
1. **Storage Capacity**: 
   - Limited to ~5-10MB depending on browser
   - Approximately 50-100 contracts with signatures before hitting limits
   - No warning when approaching storage limit

2. **No Data Sync**:
   - Data doesn't sync across browsers or devices
   - Cannot access contracts from different computers
   - No cloud backup functionality

3. **Data Persistence**:
   - Data can be lost if:
     - Browser data/cache is cleared
     - Browser is uninstalled
     - User logs out (in some browsers)
     - Storage quota is exceeded
   - No automatic backup system

4. **No Data Export**:
   - Cannot export contracts to formats other than print-to-PDF
   - No JSON/CSV/XML export functionality
   - No bulk operations

#### Functionality
5. **Single User Only**:
   - No user authentication or multi-user support
   - Cannot share contracts with other users
   - No collaboration features
   - No permission system

6. **No Real-Time Updates**:
   - Changes only reflected after page refresh in some cases
   - No WebSocket or real-time sync
   - No conflict resolution

7. **Limited Search**:
   - Simple text matching only
   - No advanced filters (date ranges, status combinations, etc.)
   - No full-text search across all fields
   - Search is case-insensitive but exact match

8. **Status Workflow**:
   - Cannot skip status steps (must go in order)
   - Cannot go backward in workflow (except revoke)
   - Once locked, contract cannot be unlocked
   - No custom workflows per blueprint

9. **Field Types**:
   - Limited to 4 field types (text, date, checkbox, signature)
   - No support for:
     - Dropdowns/select fields
     - Multi-line text areas
     - Number fields with validation
     - Currency fields
     - File attachments (other than signatures)
     - Rich text/formatting

10. **Signature Handling**:
    - Only image uploads (no draw signature)
    - Fixed size (1.5cm × 3cm)
    - No signature validation
    - Stored as base64 (increases storage size)

#### User Experience
11. **No Undo/Redo**:
    - Cannot undo deletions
    - No version history
    - No recovery for accidentally deleted items

12. **No Validation Rules**:
    - Cannot set required fields
    - No format validation (email, phone, etc.)
    - No min/max length constraints
    - No conditional logic

13. **Limited Error Handling**:
    - Basic error messages via toasts
    - No detailed error logs
    - No error reporting system

14. **Print Limitations**:
    - Depends on browser's print implementation
    - No custom PDF generation
    - May have inconsistencies across browsers
    - No print templates or customization

15. **No Mobile Optimization**:
    - Drag-and-drop difficult on touch devices
    - Small canvas on mobile screens
    - Not responsive below 768px
    - Recommended for desktop use only

#### Performance
16. **Client-Side Processing**:
    - All operations happen in browser
    - Can be slow with many contracts
    - No pagination on lists
    - No lazy loading of data

17. **Memory Usage**:
    - All data loaded into memory at once
    - Can cause performance issues with 100+ items
    - No virtualization for long lists

18. **Image Processing**:
    - Base64 conversion happens on main thread
    - Can freeze UI for large images
    - No image optimization or compression

#### Security
19. **No Authentication**:
    - Anyone with device access can view/modify contracts
    - No password protection
    - No user accounts

20. **No Encryption**:
    - Data stored in plain text
    - Visible in browser DevTools
    - Not suitable for confidential information

21. **XSS Vulnerabilities**:
    - While React provides some protection
    - User-uploaded images not sanitized beyond file type

22. **No Audit Trail**:
    - Only updatedAt timestamp
    - No detailed change history
    - Cannot see who made what changes
    - No rollback capability

#### Browser Compatibility
23. **Modern Browsers Only**:
    - Requires ES6+ support
    - No IE11 support
    - May not work in older browser versions

24. **localStorage Dependency**:
    - Doesn't work in private/incognito mode (with restrictions)
    - Blocked if user disables storage

25. **Print API Dependency**:
    - Relies on browser's native print dialog
    - Different results across browsers
    - No control over print settings

### Constraints

- **Development**: Single developer, rapid prototyping focus
- **Timeline**: Built for quick deployment without backend infrastructure
- **Scope**: Prototype/MVP, not production-ready system
- **Scale**: Designed for personal/small team use, not enterprise
- **Maintenance**: No dedicated maintenance team or SLA

### Recommended Use Cases

**✅ Good For:**
- Personal contract management
- Small team internal documents
- Prototyping contract workflows
- Learning React/TypeScript
- Template-based document generation

**❌ Not Suitable For:**
- Enterprise contract management
- Multi-user collaboration
- Legally binding e-signatures
- Sensitive or regulated data
- High-volume processing
- Mobile-first workflows
- Offline-first requirements

### Mitigation Strategies

For production use, consider:
1. **Backend Integration**: Add Node.js/Express API with database
2. **Cloud Storage**: Migrate from localStorage to cloud database
3. **Authentication**: Implement user accounts and permissions
4. **Validation**: Add comprehensive input validation
5. **Testing**: Implement unit and integration tests
6. **Accessibility**: Add ARIA labels and keyboard navigation
7. **Mobile**: Make responsive for mobile devices
8. **Export**: Add PDF generation library (e.g., jsPDF)
9. **Backup**: Implement export/import functionality
10. **Monitoring**: Add error tracking (e.g., Sentry)

## 🐛 Legacy Limitations Summary

1. **No Backend**: All data stored in localStorage (not suitable for production)
2. **Single User**: No multi-user support or authentication
3. **No Export**: Contracts cannot be exported except via print
4. **Storage Limit**: Browser localStorage has size constraints
5. **No Collaboration**: Changes are local only

## 🔮 Future Enhancements

- Backend API integration
- Database persistence
- User authentication
- Contract templates
- Email notifications
- PDF export without print dialog
- Bulk operations
- Contract versioning
- Audit trail
- Digital signatures

## 📝 License

This project is private and not licensed for public use.

## 👨‍💻 Development

### Adding New Field Types

1. Update `FormField['type']` in `src/types/blueprint.types.ts`
2. Add default size in `DEFAULT_SIZE` object in `CreateBlueprint.tsx`
3. Add color scheme in `FIELD_COLORS` object
4. Add rendering logic in `DraggableField.tsx`
5. Add value input logic in `CreateContract.tsx`
6. Add preview rendering in `ViewContract.tsx`

### Modifying Status Workflow

1. Update `Contract['status']` type in `src/types/contracts.types.ts`
2. Modify workflow array in `ViewContract.tsx` `getNextStatus()`
3. Update color mappings in status functions
4. Adjust `canRevoke()` logic if needed

## 🆘 Troubleshooting

**Issue**: Fields not appearing after creation
- **Solution**: Ensure field label is not empty before clicking Add

**Issue**: Contract not saving
- **Solution**: Check that blueprint is selected and contract name is filled

**Issue**: Signature image not displaying
- **Solution**: Ensure image file is valid and under browser size limits (~2MB recommended)

**Issue**: Status tracker not updating
- **Solution**: Refresh page or check browser console for errors

**Issue**: Data disappeared
- **Solution**: Check if browser data/localStorage was cleared. Always backup important data.

 

**Version**: 0.0.0  
**Last Updated**: January 2026
