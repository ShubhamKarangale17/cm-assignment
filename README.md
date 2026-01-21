# Contract Manager - Frontend

A modern web application for creating, managing, and tracking contracts using customizable blueprints with drag-and-drop field positioning.

## 🔗 Links

- **Live Demo**: [https://cm-assignment-dusky.vercel.app/](https://cm-assignment-dusky.vercel.app/)
- **Backend Repository**: [https://github.com/ShubhamKarangale17/cm-assignment-backend](https://github.com/ShubhamKarangale17/cm-assignment-backend)
- **Backend API Docs**: [https://contract-manager-backend.onrender.com/api-docs/](https://contract-manager-backend.onrender.com/api-docs/)

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