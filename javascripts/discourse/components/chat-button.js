import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import { defaultHomepage } from "discourse/lib/utilities";

export default class ChatButton extends Component {
    @service currentUser;
    @service chat;
    @service router;
    @service siteSettings;

    get mustShow() {
        // TODO check chat allowed groups
        return (this.currentUser && this.siteSettings.chat_enabled &&
          this.router.currentRouteName === `discovery.${defaultHomepage()}`);
    }

    @action
    launchBotchat() {
        this.chat.upsertDmChannel({usernames: [settings.chatbot_username]})
        .then((chatChannel) => {
            this.router.transitionTo("chat.channel", ...chatChannel.routeModels);
        });
    }
}