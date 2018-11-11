import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, Group } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/item-database/models/item.model';
import { ItemsService } from 'src/app/item-database/items.service';
import { Skill } from 'src/app/item-database/models/skill.model';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from 'src/app/encryption.service';

@Component({
    selector: 'app-create-build',
    templateUrl: './create-build.component.html',
    styleUrls: ['./create-build.component.scss']
})
export class CreateBuildComponent implements OnInit, OnDestroy {

    raiderClasses = ['Warrior', 'Archer', 'Priest', 'Mage'];
    raidersPerClass = {
        'Warrior': [1, 2, 3],
        'Archer': [1, 2],
        'Priest': [1, 2, 3],
        'Mage': [1, 2]
    };
    raiderTiers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    subs = new Subscription();
    groups: Group[] = [];
    items = {};
    skills = {};
    inventory = {};
    allItems: Item[] = [];
    allSkills: Skill[] = [];

    // tslint:disable-next-line:max-line-length
    constructor(private dragulaService: DragulaService, private itemsService: ItemsService, private route: ActivatedRoute, private encryptionService: EncryptionService) {
        this.inventory['Warrior'] = this.getRaiderEquipment('Warrior');
        this.inventory['Archer'] = this.getRaiderEquipment('Archer');
        this.inventory['Priest'] = this.getRaiderEquipment('Priest');
        this.inventory['Mage'] = this.getRaiderEquipment('Mage');

        this.allItems = this.itemsService.getAllItems();
        this.allSkills = this.itemsService.getAllSkills();
    }

    getRaiderEquipment(raiderClass: string) {
        const allItems = this.itemsService.getEquipmentForClass(raiderClass);

        const itemsBytier = {
            skills: this.itemsService.getSkillsForClass(raiderClass)
        };

        this.raiderTiers.forEach((tier) => {
            if (itemsBytier[tier] === undefined) {
                itemsBytier[tier] = [];
            }

            const items = allItems.filter((item) => {
                return item.tier === tier;
            });

            itemsBytier[tier] = items;
        });

        return itemsBytier;
    }

    ngOnInit() {
        this.raiderClasses.forEach((raiderClass, i) => {
            this.items[raiderClass] = [];
            this.raidersPerClass[raiderClass].forEach(c => {
                this.items[raiderClass][c] = [];
            });

            this.skills[raiderClass] = [];
            this.raidersPerClass[raiderClass].forEach(c => {
                this.skills[raiderClass][c] = [];
            });

            const group = this.dragulaService.createGroup(raiderClass.toLowerCase() + '-items', {
                copy: (el, source) => {
                    return source.id.includes('inventory');
                },
                copyItem: (itm: Item) => {
                    const item = new Item();
                    Object.assign(item, itm);
                    return item;
                },
                accepts: (el, target, source, sibling) => {
                    let nodeCount = 0;
                    for (let x = 0; x < target.children.length; x++) {
                        if (!target.children[x].classList.contains('gu-transit')) {
                            nodeCount++;
                        }
                    }
                    return !target.id.includes('inventory') && nodeCount < 4;
                },
                removeOnSpill: true
            });

            this.groups.push(group);

            const skillGroup = this.dragulaService.createGroup(raiderClass.toLowerCase() + '-skills', {
                copy: (el, source) => {
                    return source.id.includes('inventory');
                },
                copyItem: (itm: Skill) => {
                    const item = new Skill();
                    Object.assign(item, itm);
                    return item;
                },
                accepts: (el, target, source, sibling) => {
                    let nodeCount = 0;
                    for (let x = 0; x < target.children.length; x++) {
                        if (!target.children[x].classList.contains('gu-transit')) {
                            nodeCount++;
                        }
                    }
                    return !target.id.includes('inventory') && nodeCount < 4;
                },
                removeOnSpill: true
            });

            this.groups.push(skillGroup);
        });

        this.importBuildFromUrl();
    }

    ngOnDestroy() {
        this.subs.unsubscribe();

        this.groups.forEach((group) => {
            this.dragulaService.destroy(group.name);
        });
    }

    generateBuildLink() {
        let str = '';
        this.raiderClasses.forEach(raiderClass => {
            const cnt = this.raidersPerClass[raiderClass].length;
            for (let x = 1; x <= cnt; x++) {
                for (let y = 0; y < 4; y++) {
                    if (this.items[raiderClass][x][y] !== undefined) {
                        const item: Item = this.items[raiderClass][x][y];
                        str += item.name;
                    }

                    str += ',';
                }

                for (let y = 0; y < 4; y++) {
                    if (this.skills[raiderClass][x][y] !== undefined) {
                        const skill: Skill = this.skills[raiderClass][x][y];
                        str += skill.title;
                    }

                    str += ',';
                }

                str = str.substr(0, str.length - 1);

                str += '%7C';
            }
        });

        str = str.substr(0, str.length - 3);

        return window.location.origin + '/raider-builds/build?setup=' + str;
    }

    private importBuildFromUrl() {
        this.route.queryParams.subscribe(params => {
            if (params['setup'] === undefined) { return; }

            const setup = params['setup'].split('|');
            let count = 0;

            this.raiderClasses.forEach(raiderClass => {
                const cnt = this.raidersPerClass[raiderClass].length;
                for (let x = 1; x <= cnt; x++) {
                    const raiderData: string[] = setup[count].split(',');

                    for (let y = 0; y < 4; y++) {
                        const foundItems = this.allItems.filter(item => {
                            return item.name.toLowerCase() === raiderData[y].toLowerCase();
                        });

                        if (foundItems.length > 0) {
                            const newItem = new Item();
                            Object.assign(newItem, foundItems[0]);
                            this.items[raiderClass][x].push(newItem);
                        }
                    }

                    for (let y = 4; y < 8; y++) {
                        const foundSkills = this.allSkills.filter(skill => {
                            return skill.title.toLowerCase() === raiderData[y].toLowerCase();
                        });

                        if (foundSkills.length > 0) {
                            const newSkill = new Skill();
                            Object.assign(newSkill, foundSkills[0]);
                            this.skills[raiderClass][x].push(newSkill);
                        }
                    }

                    count++;
                }
            });
        });
    }
}

const LZW = {
    compress: function (uncompressed) {
        var dict = {};
        var data = (uncompressed + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict['_' + phrase + currChar] != null) {
                phrase += currChar;
            }
            else {
                out.push(phrase.length > 1 ? dict['_' + phrase] : phrase.charCodeAt(0));
                dict['_' + phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict['_' + phrase] : phrase.charCodeAt(0));
        for (var i = 0; i < out.length; i++) {
            out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    },

    decompress: function (compressed) {
        var dict = {};
        var data = (compressed + "").split("");
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            }
            else {
                phrase = dict['_' + currCode] ? dict['_' + currCode] : (oldPhrase + currChar);
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict['_' + code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join("");
    }
};
