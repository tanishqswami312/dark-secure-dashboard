
import { Navbar } from "@/components/Navbar";
import { PasswordCard } from "@/components/PasswordCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MOCK_PASSWORDS = [
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
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Password Vault</h1>
            <p className="text-muted-foreground mt-2">
              Securely store and manage your passwords
            </p>
          </div>
          <Button className="animate-slideIn">
            <Plus className="mr-2 h-4 w-4" /> Add Password
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PASSWORDS.map((pass) => (
            <PasswordCard
              key={pass.id}
              title={pass.title}
              username={pass.username}
              password={pass.password}
              website={pass.website}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
