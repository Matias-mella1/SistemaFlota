import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(opts: {
  to: string;
  nombre: string;
  token: string;              // token que ya generas en tu BD
}) {
  const fromAddr = (process.env.MAIL_FROM || '').trim();
  const fromName = (process.env.MAIL_NAME || 'CheckBus').trim();
  const appUrl   = process.env.PUBLIC_APP_URL || 'https://checkbus.cl';
  const link     = `${appUrl}/set-password?token=${encodeURIComponent(opts.token)}`;

  // Cabecera From con nombre
  const fromHeader = `${fromName} <${fromAddr}>`;

  // HTML simple (puedes personalizar estilos)
  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;line-height:1.5">
      <h2>¡Hola ${opts.nombre}!</h2>
      <p>Tu cuenta ha sido creada en <strong>CheckBus</strong>.</p>
      <p>Para establecer tu contraseña, haz clic aquí:</p>
      <p>
        <a href="${link}" target="_blank"
           style="display:inline-block;background:#2563eb;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
          Definir contraseña
        </a>
      </p>
      <p>Si no solicitaste esta cuenta, ignora este mensaje.</p>
      <hr />
      <small>Este enlace expira en 24 horas.</small>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: fromHeader,
    to: opts.to,
    subject: 'Bienvenido a CheckBus 🚍 — Define tu contraseña',
    html,
  });

  if (error) {
    // Reenvía el error hacia tu handler
    throw new Error(`Resend error: ${error.message || 'No se pudo enviar el correo'}`);
  }
}
