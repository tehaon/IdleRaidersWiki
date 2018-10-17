import { Component, OnInit } from '@angular/core';
import { AncientWisdom } from '../models/ancientWisdom.model';
import { PermanentUpgradeMoreXP } from '../models/permanentUpgradeMoreXP.model';
import { PermanentUpgradeMoreGold } from '../models/permanentUpgradeMoreGold.model';
import { PermanentUpgradeMoreDrops } from '../models/permanentUpgradeMoreDrops.model';
import { PermanentUpgradeMovementSpeed } from '../models/permanentUpgradeMovementSpeed.model';
import { PermanentUpgradeLessHP } from '../models/permanentUpgradeLessHP.model';
import { PermanentUpgradeEnergy } from '../models/permanentUpgradeEnergy.model';
import { PermanentUpgradeMoreEnemies } from '../models/permanentUpgradeMoreEnemies.model';
import { PermanentUpgradeLongerBuffs } from '../models/permanentUpgradeLongerBuffs.model';
import { PermanentUpgradeMoreMercenaries } from '../models/permanentUpgradeMoreMercenaries.model';
import { PermanentUpgradeBonusLoot } from '../models/permanentUpgradeBonusLoot.model';
import { PermanentUpgradeRedPrestessEnergyCast } from '../models/permanentUpgradeRedPrestessEnergyCast.model';
import { PermanentUpgradeMonsterAncientArtifacts } from '../models/permanentUpgradeMonsterAncientArtifacts.model';
import { PermanentUpgradeLongerFarmTimer } from '../models/permanentUpgradeLongerFarmTimer.model';
import { PermanentUpgradeLessFarmMapKills } from '../models/permanentUpgradeLessFarmMapKills.model';
import { PermanentUpgradeShieldBlockShield } from '../models/permanentUpgradeShieldBlockShield.model';
import { PermanentUpgradeMasteryOfTheElements } from '../models/permanentUpgradeMasteryOfTheElements.model';
import { PermanentUpgradeQuickSlash } from '../models/permanentUpgradeQuickSlash.model';
import { PermanentUpgradeTargetPractice } from '../models/permanentUpgradeTargetPractice.model';
import { PermanentUpgradeNoMercy } from '../models/permanentUpgradeNoMercy.model';
import { PermanentUpgradeMagicEcho } from '../models/permanentUpgradeMagicEcho.model';
import { PermanentMercenaryPower } from '../models/permanentMercenaryPower.model';
import { PermanentUpgradeArcaneWisdom } from '../models/permanentUpgradeArcaneWisdom.model';
import { PermanentUpgradeBasicHealing } from '../models/permanentUpgradeBasicHealing.model';

import { CookieService } from 'ngx-cookie-service';
import { SaveGameDecoder } from '../saveGameDecoder';
import { SaveGameData } from '../models/saveGameData.model';
import { PermanentUpgradeIdData } from '../enums/permanentUpgradeIdData.enum';

@Component({
    selector: 'app-ancient-wisdoms',
    templateUrl: './ancient-wisdoms.component.html',
    styleUrls: ['./ancient-wisdoms.component.css']
})
export class AncientWisdomsComponent implements OnInit {

    ancientWisdoms: AncientWisdom[] = [];
    activeAncientWisdoms: AncientWisdom[] = [];
    desiredValueRange: number;
    hideMaxed: boolean;
    saveGame: string;

    constructor(private cookieService: CookieService) { }

    ngOnInit() {
        this.ancientWisdoms = [
            new PermanentUpgradeMoreXP,
            new PermanentUpgradeMoreGold,
            new PermanentUpgradeMoreDrops,
            new PermanentUpgradeMovementSpeed,
            new PermanentUpgradeLessHP,
            new PermanentUpgradeEnergy,
            new PermanentUpgradeMoreEnemies,
            new PermanentUpgradeLongerBuffs,
            new PermanentUpgradeMoreMercenaries,
            new PermanentUpgradeBonusLoot,
            new PermanentUpgradeRedPrestessEnergyCast,
            new PermanentUpgradeMonsterAncientArtifacts,
            new PermanentUpgradeLongerFarmTimer,
            new PermanentUpgradeLessFarmMapKills,
            new PermanentUpgradeShieldBlockShield,
            new PermanentUpgradeMasteryOfTheElements,
            new PermanentUpgradeQuickSlash,
            new PermanentUpgradeTargetPractice,
            new PermanentUpgradeNoMercy,
            new PermanentUpgradeMagicEcho,
            new PermanentMercenaryPower,
            new PermanentUpgradeArcaneWisdom,
            new PermanentUpgradeBasicHealing
        ];

        this.ancientWisdoms.forEach(aw => {
            aw.setCookieService(this.cookieService);
        });

        const desiredvalueRange = this.cookieService.get('desiredValueRange');
        this.desiredValueRange = desiredvalueRange.length > 0 ? parseInt(desiredvalueRange, 0) : 10;

        const hideMaxed = this.cookieService.get('hideMaxed');
        this.hideMaxed = hideMaxed.length > 0 ? hideMaxed === 'true' : false;

        this.updateHideMaxed(this.hideMaxed);
    }

    updateRangeCookie(val = -1) {
        if (val !== -1) {
            this.cookieService.set('desiredValueRange', val.toString());
        }

        const currentRange = parseInt(this.cookieService.get('desiredValueRange'), 0);

        if (currentRange > 0) {
            this.ancientWisdoms.forEach(aw => {
                aw.desiredValue = Math.floor(aw.currentValue * (1 + currentRange / 100));
                aw.updateAncientWisdom('desired', aw.desiredValue);
            });
        }
    }

    updateHideMaxed(val = null) {
        if (val !== null) {
            this.cookieService.set('hideMaxed', val);
        }

        this.activeAncientWisdoms = [];

        if (this.cookieService.get('hideMaxed') === 'true') {
            this.ancientWisdoms.forEach(aw => {
                if (aw.maxUnlocks === -1 || aw.currentValue < aw.maxUnlocks) {
                    this.activeAncientWisdoms.push(aw);
                }
            });
        } else {
            this.activeAncientWisdoms = this.ancientWisdoms;
        }
    }

    fileChanged(e) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const decodedGameString = JSON.parse(this.decodeSavegameString(fileReader.result));
            const decodedPermanentUpgrades = JSON.parse(decodedGameString.s_permanentUpgradeSystem);

            decodedPermanentUpgrades.s_unlockedUpgrades.forEach(upgrade => {
                const decodedUpgradeData = JSON.parse(upgrade.s_data);
                const upgradeName = PermanentUpgradeIdData[upgrade.s_id];

                this.ancientWisdoms.forEach(aw => {
                    if (aw.name === upgradeName) {
                        aw.currentValue = decodedUpgradeData.unlockCount;
                        aw.updateAncientWisdom('current', aw.currentValue);
                    } else {
                        console.log(aw);
                    }
                });
            });

            this.updateRangeCookie();
            this.updateHideMaxed();
            this.saveGame = '';
        };

        fileReader.readAsText(e.target.files[0]);
    }

    private decodeSavegameString(a) {
        if (typeof a !== 'string' || 'null' === a) {
            return null;
        }

        a = atob(a);
        let gameString: Uint8Array;
        for (let b = new Uint8Array(a.length), c = 0; c < a.length; ++c) {
            b[c] = a.charCodeAt(c);
            gameString = b;
        }

        return new SaveGameDecoder().decompressFromUint8Array(gameString);
    }
}
