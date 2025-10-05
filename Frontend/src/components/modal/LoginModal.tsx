import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { User, Wrench, X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (path: string) => void;
}

export function LoginModal({ isOpen, onClose, onNavigateTo }: LoginModalProps) {
  const handleRoleSelect = (role: 'client' | 'contractor') => {
    onClose();
    // In a real app, this would navigate to the respective login form
    if (role === 'client') {
      // Navigate to client dashboard or login form
      console.log('Navigate to client login');
    } else {
      // Navigate to contractor mobile app or login form
      console.log('Navigate to contractor login');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Вход в систему</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Выберите тип вашей учетной записи для входа в систему
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Card 
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20"
            onClick={() => handleRoleSelect('client')}
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Войти как клиент</h3>
                <p className="text-sm text-muted-foreground">Доступ к личному кабинету</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20"
            onClick={() => handleRoleSelect('contractor')}
          >
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Wrench className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Войти как прораб</h3>
                <p className="text-sm text-muted-foreground">Мобильное приложение</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            Для входа в админ панель:{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto text-sm"
              onClick={() => {
                onClose();
                onNavigateTo('/admin');
              }}
            >
              перейдите на /admin
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}