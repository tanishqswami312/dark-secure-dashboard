
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PasswordCard } from "@/components/PasswordCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PasswordDialog, PasswordFormData } from "@/components/PasswordDialog";
import { toast } from "sonner";

interface Password extends PasswordFormData {
  id: number;
}

const MOCK_PASSWORDS: Password[] = [
  {
    id: 1,
    title: "Google Account",
    username: "john.doe",
    password: "securepass123",
    website: "google.com",
  },
  {
    id: 2,
    title: "GitHub",
    username: "johndoe",
    password: "devpass456",
    website: "github.com",
  },
  {
    id: 3,
    title: "Netflix",
    username: "john.doe@example.com",
    password: "netflixpass789",
    website: "netflix.com",
  },
];

const Index = () => {
  const [passwords, setPasswords] = useState<Password[]>(MOCK_PASSWORDS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<Password | null>(null);

  const handleSave = (data: PasswordFormData) => {
    if (editingPassword) {
      setPasswords(passwords.map(p => 
        p.id === editingPassword.id ? { ...data, id: p.id } : p
      ));
      toast.success("Password updated successfully!");
    } else {
      const newPassword = {
        ...data,
        id: Math.max(...passwords.map(p => p.id)) + 1,
      };
      setPasswords([...passwords, newPassword]);
      toast.success("Password added successfully!");
    }
    setEditingPassword(null);
  };

  const handleEdit = (password: Password) => {
    setEditingPassword(password);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Password Vault
            </h1>
            <p className="text-muted-foreground mt-2">
              Securely store and manage your passwords
            </p>
          </div>
          <Button 
            className="animate-slideIn bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => {
              setEditingPassword(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Password
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passwords.map((pass) => (
            <PasswordCard
              key={pass.id}
              title={pass.title}
              username={pass.username}
              password={pass.password}
              website={pass.website}
              onEdit={() => handleEdit(pass)}
            />
          ))}
        </div>

        <PasswordDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave}
          initialData={editingPassword || undefined}
          mode={editingPassword ? 'edit' : 'add'}
        />
      </main>
    </div>
  );
};

export default Index;
