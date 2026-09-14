import React from 'react';

export function StatCard({ label, value, subtext, icon: Icon, iconBg = 'bg-[#FAF3EE]', iconColor = 'text-[#C85A32]' }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#EFE7DB] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-stone-900 mt-1 font-serif">{value}</h3>
          {subtext && (
            <p className="text-xs text-stone-500 mt-1.5 flex items-center gap-1 font-medium">
              {subtext}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
