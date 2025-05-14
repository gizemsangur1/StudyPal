import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportWorkLogAsCSV = async (workLog: { [date: string]: number }) => {
  const header = 'Tarih,Süre (dk)\n';
  const rows = Object.entries(workLog)
    .map(([date, seconds]) => `${date},${Math.floor(seconds / 60)}`)
    .join('\n');

  const csvContent = header + rows;

  const fileUri = FileSystem.documentDirectory + 'studypal_stats.csv';
  await FileSystem.writeAsStringAsync(fileUri, csvContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  } else {
    alert('CSV oluşturuldu ama paylaşım desteklenmiyor: ' + fileUri);
  }
};
