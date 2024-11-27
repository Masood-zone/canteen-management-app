import Logo from "@/assets/svgs/logo.svg";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
      {/* Animated Logo */}
      <img
        src={Logo}
        alt="Loading"
        className="w-16 h-16 animate-bounce bg-white p-2 rounded-full" // Bouncing animation for logo
      />
      {/* Loading Text */}
      <p className="text-white mt-4 text-lg">Please wait...</p>
    </div>
  );
}
