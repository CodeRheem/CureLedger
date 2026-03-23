# CureLedger - Developer Guidelines

## Project Overview

CureLedger is a health crowdfunding platform connecting recipients, hospitals, donors, and admins. Recipients create campaigns with medical documentation, hospitals verify authenticity, admins provide final approval, and donors contribute funds.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (via Prisma)
- **Validation:** Zod
- **Payments:** Interswitch API
- **Storage:** Cloudinary (documents/images)

## Getting Started

```bash
cd Desktop/Programming/Projects/CureLedger
npm install
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
app/
├── (public)/              # Public routes (landing, browse, campaign)
│   ├── page.tsx           # Landing page
│   ├── browse/
│   ├── campaign/[id]/
│   └── auth/
│       ├── login/
│       └── register/
├── (dashboard)/           # Role-based dashboards
│   ├── recipient/
│   ├── hospital/
│   └── admin/
├── api/                   # API routes (mock for frontend demo)
└── components/            # Shared components
```

## Data & State

For frontend-only demo, mock data is in `lib/mock-data.ts`. All components should use this data. When backend is ready, replace with API calls.

### Mock Data Files

- `lib/mock-data.ts` - Users, campaigns, documents
- `lib/types.ts` - TypeScript interfaces

## Component Guidelines

### shadcn/ui - Use What You Need

This project uses shadcn/ui for all UI components. Don't limit yourself to a specific list - explore and use whatever components you need:

**Core Components (install as needed):**
```bash
npx shadcn@latest add button input card dialog form select textarea table badge label avatar dropdown-menu tabs scroll-area skeleton separator toast
```

**Blocks - Full Page Templates:**
For complete page layouts, check shadcn blocks: https://ui.shadcn.com/blocks

Available blocks include:
- Auth layouts (sign-in, sign-up pages)
- Dashboard layouts with sidebars
- Data tables with filters
- Form layouts
- Card grids
- And more...

**To download a block:**
```bash
npx shadcn@latest add -o https://ui.shadcn.com/blocks/includes/auth-signin
```

### Finding Components

1. **Check shadcn docs first:** https://ui.shadcn.com/
2. **Search existing components:** Look in `components/ui/` before building from scratch
3. **Need something new?** Run `npx shadcn@latest add <component>` to add it
4. **Need a full layout?** Check blocks and download with the CLI

### Creating New Components

1. Put shared components in `components/`
2. Role-specific components in `components/{role}/`
3. Use consistent naming: `{ComponentName}.tsx`
4. Export default for page components, named for reusable
5. **Prefer existing shadcn components over building from scratch**

### Ensuring UI Uniformity

To maintain consistent UI across the app:

1. **Use shadcn theme tokens** - Stick to shadcn's default color tokens:
   - Primary: `bg-primary text-primary-foreground`
   - Secondary: `bg-secondary text-secondary-foreground`
   - Muted: `bg-muted text-muted-foreground`
   - Destructive: `bg-destructive text-destructive-foreground`
   - Border: `border-input`
   - Ring: `ring-ring`

2. **Consistent spacing** - Use Tailwind spacing scale:
   - Padding: `p-4` for cards, `p-6` for sections
   - Gap: `gap-4` for grids, `gap-2` for inline
   - Margins: `my-4`, `mx-auto`

3. **Typography** - Use consistent heading sizes:
   - H1: `text-3xl font-bold`
   - H2: `text-2xl font-semibold`
   - H3: `text-xl font-medium`
   - Body: `text-base`
   - Small: `text-sm text-muted-foreground`

4. **Border radius** - Use `rounded-lg` for cards, `rounded-md` for buttons/inputs

5. **Cards** - Standard card structure:
   ```tsx
   <Card>
     <CardHeader>
       <CardTitle>Title</CardTitle>
       <CardDescription>Description</CardDescription>
     </CardHeader>
     <CardContent>
       {/* content */}
     </CardContent>
     <CardFooter>
       {/* actions */}
     </CardFooter>
   </Card>
   ```

6. **Status colors** - Use Badge variants:
   - Pending: `variant="secondary"` (gray)
   - Approved: `variant="default"` or `variant="outline"` (green)
   - Rejected: `variant="destructive"` (red)
   - In Progress: `variant="outline"` (blue)

7. **Responsive patterns** - Use consistent breakpoints:
   - Mobile: `grid-cols-1`
   - Tablet: `md:grid-cols-2`
   - Desktop: `lg:grid-cols-3` or `lg:grid-cols-4`

8. **Avatars** - Use shadcn Avatar for user images:
   ```tsx
   <Avatar>
     <AvatarImage src={user.avatar} />
     <AvatarFallback>{user.initials}</AvatarFallback>
   </Avatar>
   ```

9. **Dropdowns/Menus** - Use DropdownMenu for user navigation:
   ```tsx
   <DropdownMenu>
     <DropdownMenuTrigger><Avatar /></DropdownMenuTrigger>
     <DropdownMenuContent>
       <DropdownMenuItem>Profile</DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem>Logout</DropdownMenuItem>
     </DropdownMenuContent>
   </DropdownMenu>
   ```

10. **Loading states** - Use Skeleton for loading placeholders:
    ```tsx
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-20" />
      </CardContent>
    </Card>
    ```

11. **Toasts** - Show feedback with Toast:
    ```tsx
    toast({ title: "Success", description: "Campaign created!" })
    ```

### Forms & Validation

Use Zod for form validation:

```tsx
import { z } from "zod";

const campaignSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  targetAmount: z.number().min(1000),
});
```

## Adding New Routes

1. Create folder in appropriate route group
2. Add `page.tsx` for the route
3. Add layout if needed in same folder
4. Update `layout.md` with new route

## Mock API Pattern

When building features before backend is ready:

```tsx
// app/api/campaigns/route.ts
import { mockCampaigns } from "@/lib/mock-data";

export async function GET() {
  return Response.json(mockCampaigns);
}
```

## Common Tasks

### Adding a New Campaign Status

Update types in `lib/types.ts`:

```tsx
type CampaignStatus = 
  | "draft"
  | "pending_hospital"
  | "pending_admin"
  | "approved"
  | "rejected";
```

### Adding Document Upload

Use a simple file input for MVP:

```tsx
<input type="file" accept=".pdf,.jpg,.png" />
```

Display uploaded files as download links or thumbnails.

### Adding Payment Modal

For demo, show a modal with mock payment form. Actual Interswitch integration comes later via backend.

## Running the Demo

Since we're building frontend-only:

1. All data comes from `lib/mock-data.ts`
- Auth is simulated (select role on login)
- No real file uploads (console log for now)
- No real payments (mock success)

2. To demo flow:
   - Login as recipient → create campaign → upload docs
   - Login as hospital → verify campaign
   - Login as admin → approve campaign
   - Visit `/browse` as public donor → view campaign

## Code Style

- No comments unless explaining complex logic
- Use TypeScript types everywhere
- Keep components small and focused
- Use consistent naming (camelCase for files)

## Testing

Run linter:

```bash
npm run lint
```

Build check:

```bash
npm run build
```

## Questions?

Check `layout.md` for route overview
Check `backend.md` for API specifications
