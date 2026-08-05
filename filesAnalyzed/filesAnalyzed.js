const fs = require('fs');
const path = require('path');
const Table = require('cli-table3');
const chalk = require('chalk');

// 存储文件类型及其行数的统计信息
const fileTypeStats = {};

// 辅助函数：读取文件内容并计算行数
async function readFileAndCountLines(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      const lines = content.split('\n').length;
      resolve(lines);
    });
  });
}

// 辅助函数：处理文件或目录
async function processItem(itemPath) {
  const stats = await fs.promises.stat(itemPath);
  if (stats.isFile()) {
    const fileExtension = path.extname(itemPath).toLowerCase();
    if (!fileTypeStats[fileExtension]) {
      fileTypeStats[fileExtension] = {
        fileCount: 0,
        totalLines: 0,
      };
    }
    fileTypeStats[fileExtension].fileCount++;
    const lines = await readFileAndCountLines(itemPath);
    fileTypeStats[fileExtension].totalLines += lines;
  } else if (stats.isDirectory()) {
    const files = await fs.promises.readdir(itemPath);
    const filePaths = files.map((file) => path.join(itemPath, file));
    await Promise.all(filePaths.map(processItem));
  }
}

// 主函数：遍历多个文件或目录并进行统计
async function main(itemPaths) {
  try {
    await Promise.all(itemPaths.map(processItem));
    // 创建表格对象
    const table = new Table({
      head: [
        chalk.bold('文件类型'),
        chalk.bold('文件数量'),
        chalk.bold('每个类型文件行数'),
        // chalk.bold('总行数'),
      ],
      colWidths: [20, 15, 20],
    });
    let grandTotalLines = 0;
    let grandTotalFiles = 0;
    for (const [fileType, stats] of Object.entries(fileTypeStats)) {
      grandTotalLines += stats.totalLines;
      grandTotalFiles += stats.fileCount;
      table.push([fileType, stats.fileCount, stats.totalLines]);
    }
    // 添加总计行，使用 chalk 加粗和高亮显示
    table.push([
      chalk.bold('总计'),
      chalk.bold(chalk.yellow(grandTotalFiles)),
      chalk.bold(chalk.yellow(grandTotalLines)),
      // chalk.bold(chalk.yellow(grandTotalLines)),
    ]);
    // 打印表格
    console.log(table.toString());
  } catch (err) {
    console.error('Error occurred:', err);
  }
}

// 输入你想要分析的多个文件夹目录或文件的路径

const beforeItemPaths = [
  '/Users/wangsen/zz/hunter_partner_vip/src/services/order.js',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/Logistics',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/MobileModelSelect',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/Report',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/Gallery',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/NoticeCollapse',
  '/Users/wangsen/zz/hunter_partner_vip/src/components/ConditionHolder',
  '/Users/wangsen/zz/hunter_partner_vip/src/pages/order',
];

const afterItemPaths = [
  '/Users/wangsen/zz/offline-bizsystem/src/pages/PartnerManage/pages/OrderManagement',
  '/Users/wangsen/zz/offline-bizsystem/src/pages/PartnerManage/components',
  '/Users/wangsen/zz/offline-bizsystem/src/pages/PartnerManage/service/order.js',
];

main(beforeItemPaths);
// main(afterItemPaths)
