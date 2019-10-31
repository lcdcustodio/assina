const rootPath = '../..';
const assetPath = `${rootPath}/assets`;
const imagePath = `${assetPath}/images`;

export const app_json: {
  apiBaseUrl: string;
} = require(`${rootPath}/app.json`);

export const footerUnitImage: number = require(`${imagePath}/footerHome.png`);
export const logoImage: number = require(`${imagePath}/assinaLogo.png`);
export const backgroundImage: number = require(`${imagePath}/general-background.png`);
export const vilaNovaBackgroundImage: number = require(`${imagePath}/vila-nova-background.jpg`);
export const dfStarBackgroundImage: number = require(`${imagePath}/dfstar-background.png`);
