import { Card } from "@/components/ui/Card";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { requireUser } from "@/lib/auth";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const { user, profile } = await requireUser();

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-chrome">Profile</h1>
        <p className="mt-1 text-silver-dim">Manage your contact details and preferences.</p>
      </header>

      <Card className="p-6 sm:p-8">
        <ProfileForm
          email={user.email ?? profile.email ?? "Not listed"}
          defaults={{
            name: profile.name ?? user.name ?? "",
            phone: profile.phone ?? "",
            locale: profile.locale ?? "bs",
          }}
        />
      </Card>
    </div>
  );
}
