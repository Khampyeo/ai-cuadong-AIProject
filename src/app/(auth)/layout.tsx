const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="h-dvh w-screen bg-[#f0f4f8]">{children}</div>;
};
export default AuthLayout;
