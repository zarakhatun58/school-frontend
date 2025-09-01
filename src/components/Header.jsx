"use client";
import Link from "next/link";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { User, LogOut, Menu, X, } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";

export default function HeaderSignIn() {
  const { user, login, register, forgotPassword, verifyOtp, resetPassword, logout } =
    useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false)
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
  const { register: regRegister, handleSubmit: handleRegSubmit, formState: { errors: regErrors } } = useForm();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogin = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      alert("Login successful! 🎉");
      setOpen(false);
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  const onRegister = async (data) => {
    try {
      await register({ username: data.username, email: data.email, password: data.password });
      setOpen(false);
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(emailForReset);
      alert("OTP sent to your email");
      setOtpSent(true);
      setOtpOpen(true);
      setForgotOpen(false);
    } catch (err) {
      alert(err.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(emailForReset, otp);
      alert("OTP verified!");
      setOtpOpen(false);
      setResetOpen(true);
    } catch (err) {
      alert(err.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(emailForReset, newPassword);
      alert("Password reset successful!");
      setResetOpen(false);
      setEmailForReset("");
      setNewPassword("");
    } catch (err) {
      alert(err.message || "Reset failed");
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-20 bg-[#1a2246] text-white shadow-md px-6">
      <div className="container flex h-16 items-center gap-4 relative">
        <div className="font-bold text-lg">
          School <span className="opacity-80">Management</span>
        </div>
        <nav className="ml-auto hidden sm:flex gap-6">
          <Link href="/home" className="px-2 py-1 rounded hover:bg-white/20">
            Home
          </Link>
          <Link href="/dashboard" className="px-2 py-1 rounded hover:bg-white/20">
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <Button onClick={() => setOpen(true)}>Sign In</Button>
          ) : (
            <Button
              onClick={() => setProfileOpen(!profileOpen)}
              className="gap-2"
            >
              <User className="w-4 h-4" />
            </Button>
          )}

          <button
            className="sm:hidden p-2 rounded hover:bg-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-[#1a2246] text-white shadow-lg rounded-md flex flex-col gap-2 p-4 sm:hidden">
            <Link
              href="/home"
              className="px-2 py-1 rounded hover:bg-white/20"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="px-2 py-1 rounded hover:bg-white/20"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </header>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In or Register</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="signin">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="signin">
              <Card>
                <CardContent>
                  <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        {...loginRegister("email", { required: "Email is required" })}
                      />
                      {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...loginRegister("password", { required: "Password is required" })}
                        />
                        <button type="button" className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {loginErrors.password && <p className="text-red-500 text-sm">{loginErrors.password.message}</p>}
                    </div>

                    <div className="flex justify-between">
                      <button type="button" className="text-blue-600 text-sm" onClick={() => setForgotOpen(true)}>
                        Forgot Password
                      </button>
                      <button type="button" className="text-blue-600 text-sm" onClick={() => setForgotOpen(true)}>
                        Reset Password?
                      </button>
                    </div>
                    <Button type="submit" className="w-full">Login</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REGISTER */}
            <TabsContent value="signup">
              <Card>
                <CardContent>
                  <form onSubmit={handleRegSubmit(onRegister)} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input {...regRegister("username", { required: "Username is required" })} />
                      {regErrors.username && <p className="text-red-500 text-sm">{regErrors.username.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" {...regRegister("email", { required: "Email is required" })} />
                      {regErrors.email && <p className="text-red-500 text-sm">{regErrors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <div className="relative">
                        <Input type={showRegPassword ? "text" : "password"} {...regRegister("password", { required: "Password is required" })} />
                        <button type="button" className="absolute right-2 top-2" onClick={() => setShowRegPassword(!showRegPassword)}>
                          {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Register</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Email</Label>
            <Input value={emailForReset} onChange={(e) => setEmailForReset(e.target.value)} required />
            <DialogFooter>
              <Button onClick={handleForgotPassword} className="w-full">Send OTP</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={otpOpen} onOpenChange={setOtpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
          </DialogHeader>
          <Label>OTP</Label>
          <Input value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <DialogFooter>
            <Button onClick={handleVerifyOtp} className="w-full">Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
          </DialogHeader>
          <form
          type="submit"
            onSubmit={(e) => {
              e.preventDefault(); 
              handleResetPassword();
            }}
            className="space-y-4"
          >
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">Reset Password</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {profileOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white shadow-md p-2 z-50">
          <p className="text-sm font-medium">
            {user?.username || "Anonymous"}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {user?.email || "No email"}
          </p>

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              console.log("🟡 Logout button clicked");
              logout();
            }}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
