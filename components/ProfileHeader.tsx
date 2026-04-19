"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import CornerElements from "./CornerElements";

type Props = {
  user: ReturnType<typeof useUser>["user"];
};

const ProfileHeader = ({ user }: Props) => {
  if (!user) return null;

  return (
    <div className="mb-10 relative backdrop-blur-sm border border-border p-6 rounded-lg">
      <CornerElements />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {user.imageUrl ? (
            <div className="relative w-24 h-24 overflow-hidden rounded-lg">
              <Image
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">
                {user.fullName?.charAt(0) || "U"}
              </span>
            </div>
          )}

          {/* Status dot */}
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {user.fullName}
            </h1>

            <div className="flex items-center bg-cyber-terminal-bg backdrop-blur-sm border border-border rounded px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse mr-2" />
              <p className="text-xs font-mono text-primary">USER ACTIVE</p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50 my-2" />

          <p className="text-muted-foreground font-mono">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;