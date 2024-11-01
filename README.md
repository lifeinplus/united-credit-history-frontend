# United Credit History - Frontend

## Description

This repository contains the frontend part of the **United Credit History** (UCH) project, visualizing merged credit reports of individuals. The credit reports include personal data, loan request numbers, monthly payments in various currencies, and loan details.

The application built using React.js and TypeScript offers a user-friendly interface for login and register users, and exploring components such as the list of reports, the client’s credit history, the list of users, and about page.

The user can:

-   Change color themes.
-   Switch between interface languages.
-   Display extended data.
-   Change their avatar and password.
-   Manage user accounts if the user has the administrator role.
-   View a 401 (Unauthorized) error page if there are not enough roles to view an existing resource.
-   View a 404 (Not Found) error page if a report doesn’t exist or the URL is incorrect.

## Tech Stack

-   **Frontend**: React.js, TypeScript, React Bootstrap, Sass, React Router DOM
-   **State Management**: Redux Toolkit
-   **HTTP Client**: Axios, RTK Query
-   **Localization and Internationalization**: i18next
-   **UI and Styling**: Bootstrap, Bootstrap Icons, Classnames, Flag Icons
-   **Development and Build Tools**: Webpack, TypeScript, Webpack Dev Server, Sass Loader, Style Loader, CSS Loader
-   **Utilities**: React Hot Toast, Universal Cookie, @fvilers/disable-react-devtools, Popper.js

## Features

### Color Themes

A unique color palette is managed using a set of SCSS variables. To manage color themes used Redux Toolkit, reducing parameter passing, and SCSS mixins to adapt backgrounds of icons in SVG format.

### Multi-language Support

The application supports English, Russian, and Turkish. Language selection affects not only translations but also number and date formatting.

Language switching is implemented using the i18next framework.

-   Translations are stored in JSON files and separated into namespaces for each language.
-   The `useTranslation` hook provides the necessary translations to components.

### Hotkeys

The application includes hotkeys for convenient navigation:

-   Scroll credit history or paginated data tables:
    -   Left: `ArrowLeft`
    -   Right: `ArrowRight`
    -   Begin: `Option-ArrowLeft` or `Alt-ArrowLeft`
    -   End: `Option-ArrowRight` or `Alt-ArrowRight`
-   Change color theme: `Option-T` or `Alt-T`
-   Switch interface language: `Option-L` or `Alt-L`
-   Focus search field: `Option-F` or `Alt-F`
-   Toggle extended data: `Option-E` or `Alt-E`

## Structure

The project consists of the following main pages and components:

-   Pages

    -   [Sign In Page](#sign-in-page)
    -   [Sign Up Page](#sign-up-page)
    -   [Report List Page](#report-list-page)
    -   [Report Page](#report-page)
    -   [User List Page](#user-list-page)
    -   [About Page](#about-page)

-   Components

    -   [Search](#search)
    -   [Pagination](#pagination)
    -   [Extended Data and Payment Amounts](#extended-data-and-payment-amounts)
    -   [Table](#table)
        -   [Different Spellings](#different-spellings)
        -   [Tooltips and Sorting](#tooltips-and-sorting)
        -   [Sticky Header](#sticky-header)
        -   [Payment Statuses](#payment-statuses)
        -   [Active Row](#active-row)
        -   [Horizontal Scrolling](#horizontal-scrolling)

### Sign In Page

The "Sign In" page includes form validation, displays loading states, and shows error messages via toast notifications. Upon successful login, it stores user credentials and redirects the user to a specified page.

<img width="800" alt="Sign In Page" src="/docs/images/pages/signInPage.png">

### Sign Up Page

The "Sign Up" page handles asynchronous registration requests, includes form validation, and displays notifications. It redirects to the login page upon successful registration, and includes fields for names and passwords.

<img width="800" alt="Sign In Page" src="/docs/images/pages/signUpPage.png">

### Report List Page

The "Report List" page showcases all available credit reports. By selecting a client’s name, users can navigate to that client’s specific report.

<img width="800" alt="Report List Page" src="/docs/images/pages/reportListPage.png">

### Report Page

The "Report" page consists of two main panels:

1. **Personal Data**: Displays the application number, creation date, and the client’s passport data, along with loan requests and credit score details.
2. **Credit History**: Provides information on loans, including total amounts and monthly payments, with data presented in various currencies (EUR, RUB, TRY).

<img width="800" alt="Report Page" src="/docs/images/pages/reportPage.png">

### User List Page

The "User List" page is designed to manage the users of the application. It features a table that displays all registered users, and only users with the **administrator** role can access this page.

<img width="800" alt="User List Page" src="/docs/images/pages/userListPage.png">

### About Page

The "About" page is a multilingual React component with three sections: a brief description, a task list, and a loan payment timeliness legend. It adapts to light or dark themes and uses responsive Bootstrap styling.

<img width="800" alt="About Page" src="/docs/images/pages/aboutPage.png">

### Search

The "Search" component allows users to type in search queries, which are captured by the input field and dispatched to the Redux store. Search characters are highlighted in result rows. On component unmount, the search query is reset to an empty string.

<img width="800" alt="Search" src="/docs/images/components/search.png">

### Pagination

The "Pagination" component handles page navigation, tracks the active page with Redux, and updates buttons dynamically. It supports disabling during fetching, adjusts to the theme, and is memoized to avoid unnecessary re-renders.

<img width="800" alt="Pagination" src="/docs/images/components/pagination.png">

### Extended Data and Payment Amounts

The "Extended Data" switcher controls whether to show or hide additional fields in the Credit History panel. The state of the Extended Data mode is saved in browser cookies using the Universal Cookie library, so users don’t need to toggle it after page reloads and navigation.

The "Payment Amounts" component displays various loan amounts in two horizontal lists. Depending on the browser window width, the lists either align to the edges or center on the panel. Currency format and group separators are localized based on the selected language.

<img width="800" alt="Extended Data and Payment Amounts" src="/docs/images/components/extendedDataAndPaymentAmounts.png">

### Table

All tables are instances of a single dynamic component that supports customizable functionality depending on usage. When the screen width is too small, tables automatically switch to a Mobile-Friendly Mode. In this mode, rows turn into vertical cells, the header is hidden, and column names are displayed inside cells.

#### Different Spellings

Rows are compared character-by-character with the first row to highlight different spellings. Differing characters are wrapped in tags with classes for visual emphasis.

```html
<td class="text-start" data-label="Client">
    <span>
        Irina K<mark class="uch-badge diff uch-text-bg-A">zu</mark>netsova
    </span>
</td>
```

<img width="800" alt="Different Spellings" src="/docs/images/components/differentSpellings.png">

#### Tooltips and Sorting

**Tooltips** are available for fields with actonims to clarify their meaning and are implemented using Bootstrap’s `Tooltip` component. The tooltip text is stored in JSON files for each language and accessed via the system name of the column.

https://github.com/lifeinplus/united-credit-history-frontend/blob/a0e6bf9a085b6cc545c79086099e565e89aac6c3/src/components/Table/hooks/useTooltip.ts#L1-L10

**Sorting** options are provided for various data types, including text, dates, amounts, and numeric arrays. A custom sorting hook sorts table data based on a configuration of data type, column name, and direction. The sorting function is memoized using `useMemo` to prevent unnecessary re-sorting during re-renders.

https://github.com/lifeinplus/united-credit-history-frontend/blob/a0e6bf9a085b6cc545c79086099e565e89aac6c3/src/components/Table/hooks/useSortableData.ts#L10-L18

<img width="800" alt="Tooltips and Sorting" src="/docs/images/components/tooltipsAndSorting.png">

#### Sticky Header

When scrolling through large tables, the header remains fixed for easier navigation. Both the header and table body can scroll horizontally while maintaining dynamic column widths.

> [!NOTE]
> To fix the table header while scrolling, `position: sticky` is typically used. However, since the table content may overflow horizontally, a combination of `ref` hooks is used to track the position of the wrapper and header. The header’s position adjusts in the `useEffect` hook as the user scrolls.

https://github.com/lifeinplus/united-credit-history-frontend/blob/889f07fbb848f92fe527fa792cb4e5cd61909135/src/components/Table/hooks/useStickyHeader.ts#L3-L11

<img width="800" alt="Sticky Header" src="/docs/images/components/stickyHeader.png">

#### Payment Statuses

The "Payment Statuses" displays payment timeliness over time, with a legend available on the About page. The number of columns is dynamic, based on the client’s loan history.

The payment status columns are generated before rendering. The number of months between the earliest and latest payments is calculated, with the leftmost column representing the report generation date and the rightmost column representing the first credit payment date.

<img width="800" alt="Payment Statuses" src="/docs/images/components/paymentStatuses.png">

#### Active Row

Users can mark rows by clicking, and the selection remains even after sorting. Clicking again deactivates the selection.

<img width="800" alt="Active Row" src="/docs/images/components/activeRow.png">

#### Horizontal Scrolling

The horizontal scrolling buttons allow scrolling by ¾ of the visible area and navigation to the start and end of the table. `ref` hooks link the buttons and table wrapper for hotkey support and synchronized scrolling table’s header and contents.

https://github.com/lifeinplus/united-credit-history-frontend/blob/a0e6bf9a085b6cc545c79086099e565e89aac6c3/src/components/Table/hooks/useTableScroll.ts#L3-L11

<img width="800" alt="Horizontal Scrolling" src="/docs/images/components/horizontalScrolling.png">

---

v4.27.0 © 2024 Artem Denisov
