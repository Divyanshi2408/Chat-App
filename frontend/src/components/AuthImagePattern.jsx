import { ShieldCheck, Users, Sparkles } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      {/* SVG pattern background */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle fill='%23A0AEC0' cx='5' cy='5' r='3'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      {/* Blurred background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary opacity-10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary opacity-10 rounded-full blur-2xl -z-10"></div>

      {/* Main content */}
      <div className="max-w-md text-center z-10">
        {/* Animated dots pattern */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i % 3 === 0
                  ? "bg-primary animate-ping"
                  : i % 2 === 0
                  ? "bg-secondary"
                  : "bg-base-content/20"
              }`}
            ></div>
          ))}
        </div>

        {/* Title & subtitle */}
        <h2 className="text-3xl font-bold text-base-content mb-3">{title}</h2>
        <p className="text-base-content/60 mb-8">{subtitle}</p>

        {/* Icon highlights */}
        <div className="flex justify-center gap-8 text-base-content/60">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-primary" size={32} />
            <p className="text-sm font-medium">Secure</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Users className="text-secondary" size={32} />
            <p className="text-sm font-medium">Teamwork</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Sparkles className="text-accent" size={32} />
            <p className="text-sm font-medium">Productive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;

