import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

export default function ProfileCard() {
  return (
    <div className="tailwind">
      <Card className="w-80 p-4 bg-white shadow-md rounded-lg">
        <CardHeader className="p-0 space-y-1.5">
        <CardTitle className="text-xl font-semibold">İsim Soyisim</CardTitle>
        <p className="text-sm text-gray-500">Başlık cümlesi buraya.</p>
      </CardHeader>
      <CardContent className="p-0 mt-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Mesajlar</span>
            <span className="text-sm font-semibold">2</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Profil görüntüleyenler</span>
            <span className="text-sm font-semibold">10</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="font-semibold">İş İlanları</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm">Bildirimler</span>
            <span className="text-sm font-semibold">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Son başvurular</span>
            <span className="text-sm font-semibold">6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Aktif iş ilanları</span>
            <span className="text-sm font-semibold">1</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Toplam iş ilanları</span>
            <span className="text-sm font-semibold">12</span>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
