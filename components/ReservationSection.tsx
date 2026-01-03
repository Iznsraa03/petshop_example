'use client';

import { useState } from 'react';
import { MessageCircle, Calendar, User, Phone, CheckCircle } from 'lucide-react';
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

type ReservationFormData = {
  name: string;
  phone: string;
  petName: string;
  petType: string;
  service: string;
  date: string;
  notes: string;
};

export const ReservationSection = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    petName: '',
    petType: 'anjing',
    service: 'grooming',
    date: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create WhatsApp message + redirect URL
    const message = buildWhatsAppMessage({
      customerName: formData.name,
      customerPhone: formData.phone,
      petName: formData.petName,
      petType: formData.petType,
      service: formData.service,
      date: formData.date || 'Fleksibel',
      notes: formData.notes,
    });
    const whatsappUrl = buildWhatsAppUrl(message);

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Reset form after short delay
    setTimeout(() => {
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        petName: '',
        petType: 'anjing',
        service: 'grooming',
        date: '',
        notes: '',
      });
      setIsSubmitting(false);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };


  const serviceOptions = [
    { value: 'grooming', label: '✂️ Grooming Premium' },
    { value: 'hotel', label: '🏨 Pet Hotel' },
    { value: 'vaccination', label: '💉 Vaksinasi & Check-up' },
    { value: 'lainnya', label: '📞 Lainnya' },
  ];

  const petTypes = [
    { value: 'anjing', label: '🐕 Anjing' },
    { value: 'kucing', label: '🐱 Kucing' },
    { value: 'kelinci', label: '🐰 Kelinci' },
    { value: 'hamster', label: '🐹 Hamster' },
    { value: 'burung', label: '🦜 Burung' },
    { value: 'lainnya', label: '🦎 Lainnya' },
  ];

  return (
    <section id="reservation" className="py-20 bg-gradient-to-b from-petshop-background to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-petshop-dark mb-4">
            Buat Reservasi
          </h2>
          <p className="text-xl text-petshop-dark/70">
            Isi formulir di bawah dan kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-petshop-secondary">
          <div className="bg-gradient-to-r from-petshop-primary to-petshop-accent p-8 text-white">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Form Reservasi Online</h3>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6" aria-label="Form reservasi via WhatsApp">
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nama Pemilik *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama Anda"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Nomor Telepon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Misal: 081234567890"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Pet Name & Pet Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pet Name */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  Nama Hewan Peliharaan *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  placeholder="Misal: Fluffy, Max, Luna"
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Pet Type */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  Jenis Hewan *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors bg-white"
                >
                  {petTypes.map(pet => (
                    <option key={pet.value} value={pet.value}>
                      {pet.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Service & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  Layanan yang Diinginkan *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors bg-white"
                >
                  {serviceOptions.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-petshop-dark mb-2">
                  Tanggal Perkiraan (Opsional)
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-petshop-dark mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Masukkan informasi tambahan, alergi, atau permintaan khusus..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-petshop-secondary focus:border-petshop-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-petshop-primary to-petshop-accent text-white rounded-2xl font-bold text-lg hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim ke WhatsApp'}
              </button>
            </div>

            {/* Info Text */}
            <p className="text-center text-sm text-petshop-dark/60">
              Anda akan diarahkan ke WhatsApp untuk mengirim reservasi. Tidak ada biaya untuk mengirim pesan.
            </p>
          </form>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mt-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-green-900">Sukses!</h4>
              <p className="text-green-700">
                Formulir Anda telah dikirim melalui WhatsApp. Tim kami akan segera menghubungi Anda.
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '⚡',
              title: 'Respon Cepat',
              description: 'Kami akan merespon dalam waktu kurang dari 1 jam',
            },
            {
              icon: '✅',
              title: 'Konfirmasi Langsung',
              description: 'Dapatkan konfirmasi ketersediaan secara real-time',
            },
            {
              icon: '🎉',
              title: 'Jaminan Kualitas',
              description: 'Layanan premium dengan harga yang terjangkau',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border-2 border-petshop-secondary hover:shadow-glow-lg transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-bold text-petshop-dark mb-2">{feature.title}</h4>
              <p className="text-petshop-dark/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
