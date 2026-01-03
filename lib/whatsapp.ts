export type WhatsAppMessageOptions = {
  businessName?: string;
  service?: string;
  petType?: string;
  petName?: string;
  date?: string;
  notes?: string;
  customerName?: string;
  customerPhone?: string;
};

/**
 * NOTE: nomor WhatsApp final belum ada.
 * Ganti nomor ini ke nomor bisnis kamu (format internasional tanpa +)
 * Contoh: 628123456789
 */
export const WHATSAPP_NUMBER = '6285696504771';

export const buildWhatsAppMessage = (opts: WhatsAppMessageOptions = {}): string => {
  const {
    businessName = 'PetCare',
    service,
    petType,
    petName,
    date,
    notes,
    customerName,
    customerPhone,
  } = opts;

  const lines: string[] = [`*RESERVASI ${businessName.toUpperCase()}* 🐾`, ''];

  if (customerName) lines.push(`Nama: ${customerName}`);
  if (customerPhone) lines.push(`Nomor Telepon: ${customerPhone}`);
  if (petName) lines.push(`Nama Hewan: ${petName}`);
  if (petType) lines.push(`Jenis Hewan: ${petType}`);
  if (service) lines.push(`Layanan: ${service}`);
  if (date) lines.push(`Tanggal: ${date}`);
  if (notes) lines.push(`Catatan: ${notes}`);

  lines.push('', 'Halo admin, saya mau tanya ketersediaan & harga. Terima kasih!');

  return lines.join('\n');
};

export const buildWhatsAppUrl = (message: string, phoneNumber: string = WHATSAPP_NUMBER): string => {
  // wa.me expects digits only
  const normalized = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
};
