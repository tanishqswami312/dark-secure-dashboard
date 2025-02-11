
import { Copy, Eye, EyeOff, Edit2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PasswordCardProps {
  title: string;
  username: string;
  password: string;
  website: string;
  onEdit: () => void;
}

export const PasswordCard = ({ title, username, password, website, onEdit }: PasswordCardProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <div className="glass p-6 rounded-xl card-hover">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg bg-gradient-to-r from-primary/90 to-accent/90 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{website}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/20"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Username</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">{username}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/20"
                onClick={() => copyToClipboard(username, "Username")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Password</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono">
                {showPassword ? password : "•".repeat(password.length)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/20"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/20"
                onClick={() => copyToClipboard(password, "Password")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
