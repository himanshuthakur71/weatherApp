export const createEmailHTML = (weather: any, user: any) => {
  const icon = weather.weather[0]?.icon;
  let emoji = "🌤️";
  if (icon === "01n") emoji = "🌙";
  if (icon === "01d") emoji = "☀️";

  // Convert epoch -> UTC + IST
  const formatDate = (epoch: number) => {
    const dateUTC = new Date(epoch * 1000); // epoch is seconds
    const utc = dateUTC.toISOString().replace("T", " ").split(".")[0] + " UTC";
    const istDate = new Date(dateUTC.getTime() + 5.5 * 60 * 60 * 1000);
    const ist =
      istDate.toISOString().replace("T", " ").split(".")[0] + " IST";
    return { utc, ist };
  };

  const sunrise = formatDate(weather.sys.sunrise);
  const sunset = formatDate(weather.sys.sunset);

  // created_at -> UTC + IST
  const createdAt = new Date(weather.created_at);
  const createdUTC =
    createdAt.toISOString().replace("T", " ").split(".")[0] + " UTC";
  const createdISTDate = new Date(createdAt.getTime() + 5.5 * 60 * 60 * 1000);
  const createdIST =
    createdISTDate.toISOString().replace("T", " ").split(".")[0] + " IST";

  const htmlText = `
<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
    <table width="680" style="background:#fff;border-radius:8px;overflow:hidden;">
      <tr><td style="padding:18px;background:#0b1220;color:#fff;">
        <h1 style="margin:0;">Weather update for ${weather.name}</h1>
        <p style="margin:6px 0 0;font-size:13px;">Location: ${weather.coord.lat}°, ${weather.coord.lon}° • Country: ${weather.sys.country}</p>
      </td></tr>

      <tr><td style="padding:18px;">
        <table width="100%"><tr>
          <td width="180" valign="top" style="padding-right:16px;text-align:center;">
            <div style="font-size:46px;">${emoji}</div>
            <div style="font-weight:600;font-size:18px;margin-top:8px;">${weather.weather[0]?.main}</div>
            <div style="color:#6b7280;font-size:14px;text-transform:capitalize;">${weather.weather[0]?.description}</div>
          </td>

          <td valign="top">
            <div style="font-size:28px;"><strong>${weather.main.temp}°C</strong> <span style="font-size:13px;color:#6b7280;margin-left:8px;">feels like ${weather.main.feels_like}°C</span></div>
            <table style="width:100%;font-size:13px;color:#374151;margin-top:8px;">
              <tr><td><strong>Humidity:</strong> ${weather.main.humidity}%</td><td><strong>Pressure:</strong> ${weather.main.pressure} hPa</td></tr>
              <tr><td><strong>Wind:</strong> ${weather.wind.speed} m/s (gust ${weather.wind.gust}) • ${weather.wind.deg}°</td><td><strong>Visibility:</strong> ${weather.visibility} m</td></tr>
              <tr><td><strong>Clouds:</strong> ${weather.clouds.all}%</td><td><strong>Ground level:</strong> ${weather.main.grnd_level} hPa</td></tr>
            </table>

            <div style="background:#f1f5f9;padding:10px;border-radius:6px;margin-top:10px;font-size:13px;color:#0f172a;">
              <strong>Recorded at:</strong><br/>
              UTC: ${createdUTC}<br/>
              IST: ${createdIST}
            </div>
          </td>
        </tr></table>

        <div style="margin-top:14px;background:#0f172a;color:#fff;padding:12px;border-radius:6px;">
          <table width="100%"><tr>
            <td><strong>Sunrise</strong><br/><span style="color:#d1d5db;font-size:13px;">UTC: ${sunrise.utc} • IST: ${sunrise.ist}</span></td>
            <td style="text-align:right;"><strong>Sunset</strong><br/><span style="color:#d1d5db;font-size:13px;">UTC: ${sunset.utc} • IST: ${sunset.ist}</span></td>
          </tr></table>
        </div>

      </td></tr>

      <tr><td style="padding:14px;background:#f8fafc;font-size:12px;color:#6b7280;text-align:center;">
        <div>User: ${user?.user_metadata?.first_name || ""} ${user?.user_metadata?.last_name || ""}</div>
      </td></tr>

    </table>
  </td></tr></table>
</body>
</html>
`;

  return htmlText;
};
