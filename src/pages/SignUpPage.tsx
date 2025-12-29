import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    username?: string; 
    email?: string; 
    password?: string; 
    confirmPassword?: string 
  }>({});
  const [backendMessage, setBackendMessage] = useState<{ message: string; success: boolean } | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = 'El nombre es requerido';
    if (!username.trim()) newErrors.username = 'El nombre de usuario es requerido';
    
    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      newErrors.email = 'Email inválido';
    }

    if (!password.trim()) newErrors.password = 'La contraseña es requerida';
    
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password.trim() !== confirmPassword.trim()) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setBackendMessage(null);

    try {
      const response = await authService.signup({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.success) {
        toast({
          title: '¡Cuenta creada!',
          description: 'Registro exitoso. Redirigiendo al inicio de sesión...',
        });

        setAccountCreated(true); // deshabilita el botón
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setBackendMessage({ message: response.message || 'Error al registrarse', success: false });
        setLoading(false);
      }
    } catch (err: any) {
      setBackendMessage({ message: err.response?.data?.message || 'Error en la conexión con el servidor', success: false });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">TaskFlow</h1>
          <p className="text-muted-foreground mt-2">Crea tu cuenta para comenzar</p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-semibold">Registro</CardTitle>
            <CardDescription>
              Completa los campos para crear tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`pl-10 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={accountCreated || loading}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive animate-fade-in">{errors.name}</p>}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="juanperez"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`pl-10 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={accountCreated || loading}
                  />
                </div>
                {errors.username && <p className="text-sm text-destructive animate-fade-in">{errors.username}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={accountCreated || loading}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={accountCreated || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    disabled={accountCreated || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive animate-fade-in">{errors.confirmPassword}</p>}
              </div>

              {/* Botón Crear Cuenta */}
              <Button type="submit" className="w-full" disabled={accountCreated || loading}>
                {(loading || accountCreated) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </Button>

              {/* Mensaje de error del backend */}
              {backendMessage && !backendMessage.success && (
                <p className="text-sm animate-fade-in mt-2 text-center text-destructive">
                  {backendMessage.message}
                </p>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <span
                className="font-medium text-primary hover:underline cursor-pointer"
                onClick={() => navigate('/signin')}
              >
                Inicia sesión
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
