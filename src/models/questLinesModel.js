import QuestModel from "./questModel.js";


export default class QuestLinesModel {
    constructor() {
        this.currentQuestIndex = 0;

        this.questLines = {
            main: {
                currentQuestIndex: 0,
                length: 10,
                quests: [
                    new QuestModel(
                        "main_quest_1",
                        "Go talk to the mayor", "",
                        { type: "talk", target: "mayor", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "mayor", dialogLines: [{text: "Did you kill the Orcs yet ?", choices: ["I'll do it", "exit"]}]}
                    ),
                    new QuestModel(
                        "main_quest_2",
                        "Kill 5 orcs", "",
                        { type: "kill", target: "orc", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "mayor", dialogLines: [{text: "Did you kill the Orcs yet ?", choices: ["Yes", "exit"]}]}
                    ),
                    new QuestModel(
                        "main_quest_3",
                        "Go talk to the mayor", "Go talk to the mayor.",
                        { type: "talk", target: "mayor", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "mayor", dialogLines: [
                            {text: "Thank you for your help !", choices: []},
                            {text: "Did you notice you gain souls when killing monsters ?\nYou can see your souls count below your health bar.", choices: []},
                            {text: "You can use them to level up you character.\nGo see Joanna near the lac she'll tell you more about\nit.", choices: ["Yes", "No"]}
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_4",
                        "Go talk to the mayor", "Go talk to the mayor.",
                        { type: "talk", target: "mayor", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            {text: "Hello Adventurer !", choices: []},
                            {text: "Did the mayor sent you ? I see, i'll help you with\nyour souls.\nTo level up your character, talk to me\nand select the 'Level up' option.", choices: ["Yes", "Exit"]}
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_5",
                        "Go talk to Joanna", "",
                        { type: "talk", target: "joanna", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            { text: "Hello, traveler! What do you seek?", choices: ["Level up", "View stats", "Exit"] }
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_6",
                        "Level up you character", "",
                        { type: "level", target: "", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            {text: "Good job !", choices: []},
                            {text: "Now you character is a little stronger, but you also\ngained a stat point you can use.\nSelect the 'View Stats' option to upgrade your stats.", choices: ["Yes", "Exit"]}
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_7",
                        "Talk to Joanna", "",
                        { type: "talk", target: "joanna", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            { text: "Hello, traveler! What do you seek?", choices: ["Level up", "View stats", "Exit"] }
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_8",
                        "Upgrade your stats", "",
                        { type: "stat", target: "", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            { text: "Great, now you know how to use souls !\nCome back any time.", choices: [] },
                            { text: "You should go back to the mayor, he'll have tasks for\n you.", choices: ["Yes", "Exit"] }
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_9",
                        "Talk to Joanna", "",
                        { type: "talk", target: "joanna", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "mayor", dialogLines: [
                            { text: "I have a task for you !", choices: [] }
                        ]}
                    ),
                    new QuestModel(
                        "main_quest_10",
                        "Talk to the Mayor", "",
                        { type: "talk", target: "mayor", count: 1 },
                        (quest) => console.log(`${quest.title} completed!`),
                        "main",
                        {npcName: "joanna", dialogLines: [
                            { text: "Hello, traveler! What do you seek?", choices: ["Level up", "View stats", "Exit"] }
                        ]}
                    ),
                ]
            }
        }
    }
}