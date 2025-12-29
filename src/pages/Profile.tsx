import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Profile() {
    const user = useSelector((state: RootState) => state.user.user);

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Mi Perfil</h1>
        <Card>
          <CardHeader className="text-center pb-2">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">{user?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium">{user?.email}</p></div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div><p className="text-xs text-muted-foreground">Miembro desde</p><p className="text-sm font-medium">{user?.createdAt && format(new Date(user.createdAt), "d 'de' MMMM, yyyy", { locale: es })}</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
