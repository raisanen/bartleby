import { BartlebySettings, ISettingsParams } from '../data/settings';
import { DbHelper } from '../data/db';

const _settingsId = 'settings';

export default {
    _db: new DbHelper<BartlebySettings>('config', (d) => new BartlebySettings((d ?? {}) as ISettingsParams)),

    async get(): Promise<BartlebySettings> {
        const settings = await this._db.get(_settingsId);
        if (settings) {
            return settings;
        } else {
            const newSettings = new BartlebySettings({_id: _settingsId});
            await this._db.put(newSettings);
    
            return newSettings;    
        }
    },

    async update(settings: BartlebySettings) {
        return await this._db.update(settings);
    }
}