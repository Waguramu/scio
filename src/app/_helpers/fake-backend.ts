import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

import {User} from '@/_models';
import {Client} from '@/_models';
import {Collection} from '@/_models';
import {Document} from '@/_models';
import {Attachments} from '@/_models';
import {History} from '@/_models';
import {Subscription} from '@/_models';

export class FakeData {

    subscriptions: Subscription[] = [
        {id: '1', active: true, expires: '31.12.2019', type: 'Expert'},
        {id: '2', active: true, expires: '31.12.2018', type: 'Expert'},
        {id: '3', active: true, expires: '31.12.2017', type: 'Expert'},
        {id: '4', active: true, expires: '31.12.2016', type: 'Expert'}
    ];
    users: User[] = [
        {
            id: "1",
            username: 'jessica.pearson',
            password: 'p3@rs0n',
            firstName: 'Jessica',
            lastName: 'Pearson',
            email: 'jessica.pearson@awesomecompany.de',
            tel: '089 111111',
            birthday: '01.06.1990',
            saved: null,
            clients: null,
            history: null,
            photo: '',
            subscription: this.subscriptions[0]
        },
        {
            id: "2",
            username: 'harvey.specter',
            password: 'sp3ct3r',
            firstName: 'Harvey',
            lastName: 'Specter',
            email: 'harvey.specter@awesomecompany.de',
            tel: '089 222222',
            birthday: '01.01.1990',
            saved: null,
            clients: null,
            history: null,
            photo: '',
            subscription: this.subscriptions[1]
        },
        {
            id: "3",
            username: 'rachel.zane',
            password: 'z@n3',
            firstName: 'Rachel',
            lastName: 'Zane',
            email: 'rachel.zane@awesomecompany.de',
            tel: '089 333333',
            birthday: '01.12.1990',
            saved: null,
            clients: null,
            history: null,
            photo: '',
            subscription: this.subscriptions[2]
        },
        {
            id: "4",
            username: 'mike.ross',
            password: 'r0ss',
            firstName: 'Mike',
            lastName: 'Ross',
            email: 'mike.ross@awesomecompany.de',
            tel: '089 444444',
            birthday: '01.03.1990',
            saved: null,
            clients: null,
            history: null,
            photo: '',
            subscription: this.subscriptions[3]
        }
    ];
    documents: Document[] = [
        {
            id: "1",
            creator: this.users[1],
            title: 'Probleme beim Autokauf',
            "annotations": [
                "wagen sofort reparieren",
                "diese reparaturrechnung stellt",
                "weiterfahrt war möglich",
                "nächstgelegenen kfz-werkstatt wurde",
                "dennoch lässt k",
                "k verlangt",
                "k zurückzuführen",
                "familie klein",
                "katalysators festgestellt",
                "mehr klären"
            ],
            date: '01.01.2019',
            keypoints: [''],
            file: 'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.\n' +
                'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.'
        },
        {
            id: "2",
            creator:  this.users[2],
            title: 'Geschädigte Helfer',
            "annotations": [
                "kurzen unachtsamkeit übersehen",
                "vielbefahrene bundesstraße benutzen",
                "mitverschulden anrechnen lassen",
                "bundesstraße gefahren war",
                "ihn überholen konnte",
                "ersatz seiner heilungskosten",
                "angehängte strohpresse verdeckt",
                "unbeleuchtete strohpresse aufmerksam",
                "lastkraftwagenfahrer rudi raser",
                "autofahrer vincent vorsichtig"
            ],
            date: '',
            keypoints: [''],
            file: 'Der Landwirt Florian Fleißig fuhr nach Einbruch der Dunkelheit mit seiner Zugmaschine und angehängter Strohpresse von seinem Feld nach Hause. Dazu musste er ein kurzes Stück (ca. 150m) eine vielbefahrene Bundesstraße benutzen. Zwar funktionierten die Rücklichter der Zugmaschine, diese wurden aber durch die angehängte Strohpresse verdeckt. Die Strohpresse selbst war unbeleuchtet. Nachdem Fleißig etwa 50 m auf der Bundesstraße gefahren war, näherte sich von hinten der Autofahrer Vincent Vorsichtig. Dieser bemerkte die in der Dunkelheit vor ihm auftauchende Strohpresse samt Zugmaschine gerade noch so frühzeitig, dass er an Fleißig vorbeifahren und ihn überholen konnte. Vorsichtig lenkte sein Auto an den rechten Straßenrand, schaltete die Warnblinkanlage ein. Fleißig hielt nun ebenfalls an. Vorsichtig stieg aus und machte Fleißig auf die unbeleuchtete Strohpresse aufmerksam. Während beide sich noch unterhielten, fuhr der Lastkraftwagenfahrer Rudi Raser von Hinten auf die Strohpresse auf, da er diese infolge einer kurzen Unachtsamkeit übersehen hatte. Fleißig und Vorsichtig wurden nicht unerheblich verletzt. Vorsichtig verlangt nun von Fleißig und Raser den Ersatz seiner Heilungskosten. Fleißig wendet dagegen ein, er habe gewusst, dass die Strohpresse unbeleuchtet gewesen sei. Wenn Vorsichtig ihn nicht angehalten hätte, wäre es nicht zu dem Unfall bekommen, weil er dann bereits die Abzweigung zu seinem Hof erreicht hätte. Es sei nicht die Aufgabe des Vorsichtig, andere Verkehrsteilnehmer zu erziehen, er müsse sich daher ein Mitverschulden anrechnen lassen.'
        },
        {
            id: "3",
            creator: this.users[3],
            title: 'Die weiten Kreise der Abtretung',
            "annotations": [
                "um diese herunter",
                "nächsten ersten gekündigt",
                "neue lagerhalle errichtet",
                "guten kunden schätzt",
                "april liefert ackermann",
                "seinen privaten garten",
                "seiner hausbank aufnehmen",
                "juli verlangt müller",
                "sicherungshalber abgetretene forderung",
                "märz ruft huber"
            ],
            date: '01.03.2019',
            keypoints: [''],
            file: 'Der Bauunternehmer Huber (H) kauft für seinen privaten Garten bei dem Einzelhändler Schmidt (S) am 10. Februar einen Rasenmäher (€ 200,-), eine Gartenlaube (€ 800,-) und eine Gartenmöbelgarnitur(€ 1000,-).Da Huber die Sachen vor dem Sommer nicht gebrauchen kann und Schmidt die Möbelgarnitur erst bestellen muss, vereinbaren sie, dass die Sachen erst nach den Osterferien geliefert und bezahlt werden sollen. Bereits am 15. März ruft Huber bei Schmidt an und teilt ihm mit, dass er den Rasenmäher doch nicht braucht und nur die Möbel und die Gartenlaube geliefert werden sollen. Schmidt, der Huber als guten Kunden schätzt, storniert daraufhin den Rasenmäher, vergisst aber, dies der Buchhaltung mitzuteilen. Am 2. April tritt die Angestellte Ackermann (A) des Schmidt telefonisch alle genau bezeichneten Forderungen des Schmidt gegen Huber zur Sicherung einiger noch offener Rechnungen an den Großhändler Müller (M) ab. Sie teilt dies Huber erst am 4. Mai mit. Am 21. April liefert Ackermann die Gartenlaube bei Huber an und erhält von diesem den Kaufpreis von € 800 wie vereinbart in bar ausbezahlt. Die Gartenmöbelgarnitur wird einen Tag später vom Fahrer Trampel (T) des Schmidt geliefert. Schmidt hatte Trampel zum nächsten ersten gekündigt. Aus Wut über die Kündigung, um seinem Chef „eines auszuwischen“ stößt Trampel mit dem Tisch gegen eine in seinen Augen besonders hässliche Statue im Garten des Huber, um diese herunter zu werfen. Die Statue geht zu Bruch. Huber regt sich furchtbar auf und weigert sich, Trampel Geld für die Möbel zu geben. Am 2. Juli verlangt Müller von Huber Zahlung der abgetretenen € 2.000. Huber verweigert die Zahlung: Der Vertrag über den Rasenmäher sei wirksam storniert worden, die Gartenlaube habe er bereits bezahlt. Im Gegenteil Müller schulde ihm noch € 700 Schadensersatz für die zerstörte Statue. Er rechne daher mit dieser Forderung auf. Überdies beruft sich Huber auf folgenden Sachverhalt: Huber hatte letztes Jahr auf dem Betriebsgelände des Schmidt eine neue Lagerhalle errichtet. Da Huber zu dieser Zeit kurzfristig in Liquiditätsschwierigkeiten war, musste er ein Darlehen bei seiner Hausbank aufnehmen. Zur Sicherung dieses Darlehens trat er die Forderung wegen der Errichtung der Lagerhalle gegen Schmidt an die Hausbank ab. Am 25. Juni übertrug die Hausbank die an sie sicherungshalber abgetretene Forderung wieder an Huber zurück, nachdem dieser das Darlehen plus Zinsen getilgt hatte. Die letzte Rate in Höhe von € 1000,- nach Abnahme der Halle im März sei immer noch offen. Auch mit dieser Forderung rechne Huber gegen den Anspruch des Müller auf, sofern dieser bestehe.'
        },
        {
            id: "4",
            creator: this.users[3],
            title: 'Das Glück der Erde…',
            "annotations": [
                "ohrhörern laut musik",
                "so sehr überrascht",
                "mehr rechtzeitig ausweichen",
                "aufgrund ihrer turniererfahrung",
                "radler „auf abstand",
                "krankenhaus erfolgten behandlung",
                "darüber hinaus wissen",
                "ihrem rechtsanwalt dr",
                "wald laut musik",
                "zudem möchte s"
            ],
            date: '01.04.2019',
            keypoints: [''],
            file: 'Die beiden zwanzig Jahre alten Zwillinge Biggi (B) und Dina (D) sind reitbegeistert und verbringen jede freie Minute auf den Rücken ihrer Pferde Tim (B‘s Pferd) und Struppi (D’s Pferd). Seit einigen Jahren haben sich die beiden auch im Dressursport einen Namen gemacht und auf Turnieren bereits zahlreiche Preise und Pokale gewonnen. Um sich vom letzten Turnierwochenende zu erholen, veranstalten die beiden eines Sonntags ein Wettrennen und preschen auf den Rücken ihrer Pferde im Galopp durch den nahen Wald. Aufgrund ihrer Turniererfahrung sind beide Schwestern routinierte Reiter, die ihre Pferde kontrolliert und sicher über jeden noch so engen Waldweg zu führen wissen. Dass neben Spaziergängern und Joggern auch einige Fahrradfahrer die Waldwege nutzen, ist den Schwestern bekannt. Darüber hinaus wissen sie auch, dass das hohe Tempo, mit dem sie unterwegs sind, einen erheblichen „Bremsweg“ mit sich bringen kann. Dennoch verlassen sie sich stets darauf, dass der Lärm, den sie und ihre Pferde verursachen, laut genug sei, um jeden herannahenden Passanten oder Radler „auf Abstand“ zu halten. An jenem Sonntag ist auch die Sportlehrerin Sonja (S) mit ihrem Mountainbike zu einer Trainingsfahrt im Wald unterwegs. S hört während ihrer Fahrt mit einen Ipod und Ohrhörern laut Musik. Als alle richtig Fahrt aufgenommen haben, treffen die drei an einer Weggabelung aufeinander. Dabei sind sie so sehr überrascht, dass sie nicht mehr rechtzeitig ausweichen können. S wird von einem der Hufe von Biggis Pferd Tim getroffen, fliegt durch die Luft und landet auf dem Waldweg. Der iPod der S fällt ihr dabei aus der Tasche und kommt erst vier Meter weiter im hohen Gras zum Liegen. Einige Tage später findet ein Spaziergänger den Ipod, freut sich, dass er funktioniert, und nimmt ihn an sich. S erleidet mehrere Rippenbrüche, Prellungen und einen Nasenbeinbruch und muss daher einige Tage im Krankenhaus verbringen. Als S wieder voll genesen ist, begibt sie sich zu ihrem Rechtsanwalt Dr. Schlau und bittet ihn, folgende Fragen zu prüfen: 1) Kann S von B die Kosten der im Krankenhaus erfolgten Behandlung der Rippenverletzungen in Höhe von 300 € ersetzt bekommen? 2) Zudem möchte S die Kosten für eine notwendige ästhetische Operation ihrer gebrochenen Nase geltend machen. Die Kosten hierfür belaufen auf ca. 2000 €. Die Korrektur will sie nicht vornehmen lassen, da sie sich vor der Narkose fürchtet. S will aber jedenfalls das Geld und meint, es sei ihr Sache, sich operieren zu lassen oder nicht. 3) Zum Trost für ihre durch den Unfall erlittenen Schmerzen würde S zudem gerne, sofern möglich, eine Art „Gegenleistung“ erhalten. 4) Außerdem möchte S wissen, ob sie wegen des abhanden gekommenen i- Pods, etwas geltend machen könne. Schließlich habe sie diesen erst am Vortag für 150 € erworben. B ist der Ansicht, dass S für den Unfall mindestens genauso viel könne wie sie. Schließlich habe S so laut Musik gehört, dass sie die Pferde nicht bemerkt habe. S meint, es sei ja nicht verboten, bei der Fahrt durch den Wald laut Musik zu hören. Mit galoppierenden Reitern auf schmalen Waldwegen hingegen müsse man nicht rechnen.'
        },
        {
            id: "5",
            creator: this.users[4],
            title: 'Das Geburtstagsgeschenk',
            "annotations": [
                "zurzeit zwar ausgestellt",
                "auto abgeschleppt wurde",
                "verschiedensten kunstwerke ansieht",
                "selber viel unterwegs",
                "seinem chef kindermann",
                "allerdings verlangt kindermann",
                "gutes geschäft wittert",
                "jungen künstlers olgi",
                "eigentümer seien solle",
                "worauf ihm halber"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Kunsthändler Kindermann (K) betreibt eine florierende Kunstgalerie. Da er selber viel unterwegs ist, hat er als Assistenten Tretter (T) angestellt, der für die Ein- und Verkäufe zuständig und bevollmächtigt ist. Am 20. Oktober kommt die Seniorin Halber (H) mit einem Gemälde in die Galerie und erklärt dem einzig anwesenden Tretter, sie wolle ein mitgebrachtes Kunstwerk des jungen Künstlers Olgi zum Preis von 1.000 € veräußern. Tretter erklärt sich mit dem Kauf einverstanden und zahlt den Betrag, worauf ihm Halber das Bild übergibt. Am nächsten Tag spricht Tretter mit seinem Chef Kindermann und bietet ihm an, das Bild für einen Preis von 1.300 € selbst zu erwerben. Kindermann erklärt, dass er das Bild dem Tretter gerne verkaufe und er nun Eigentümer seien solle. Allerdings verlangt Kindermann, dass das Gemälde noch 3 weitere Wochen zur Ausstellung in der Galerie verbleibt und dass Tretter in dieser Zeit das Gemälde weder veräußert noch in sonstiger Weise darüber verfügt. Tretter willigt ein und bezahlt den Preis von 1.300 €. Der Banker Benning (B) befindet sich am Abend des 22. Oktober gerade auf dem Heimweg, als ihm einfällt, dass er für seine Ehefrau noch kein Geburtstagsgeschenk besorgt hat. Daher beschließt er, vor der Heimkehr noch einen kleinen Umweg zu fahren, um bei dem Kunsthändler Kindermann ein passendes Geschenk zu finden. Als er am Geschäft des Kindermann ankommt, nimmt er den erstbesten Parkplatz, den er findet. In der Eile übersieht er, dass er den Wagen auf der als „Privatparkplatz“ gekennzeichneten Fläche eines Mietshauses abstellt. Während Benning sich in aller Ruhe die verschiedensten Kunstwerke ansieht, will der Mieter Meier (M) sein Fahrzeug auf dem von ihm gemieteten Stellplatz parken und bemerkt den Wagen des Benning. Nachdem Meier eine Viertelstunde gewartet und einen anderen Parkplatz genutzt hat, lässt er den Wagen von einem Abschleppdienst abschleppen und begleicht die Abschleppkosten iHv 200 €, um sie dann von Benning wieder erstattet zu bekommen. Nach einigem Suchen entscheidet Benning sich für das Gemälde des Olgi. Tretter, der ein gutes Geschäft wittert, erklärt ihm daraufhin, er selber sei der Eigentümer dieses Bildes. Es werde zurzeit zwar ausgestellt, stehe aber zum Verkauf. Benning findet das plausibel und schließt einen Kaufvertrag mit Tretter. Da das Bild zu groß für den Sportwagen des Benning ist, wird vereinbart, dass Tretter dem Benning das Gemälde liefert. Als Benning die Galerie verlässt, muss er feststellen, dass sein Auto abgeschleppt wurde. Frustriert fährt er mit einem Taxi nach Hause. Noch am selben Abend nimmt der Tretter das Gemälde und fährt zum Haus des Benning. Dort übergibt er das Gemälde und erhält wie vereinbart den Kaufpreis von 1.900 €. Als Kindermann einen Tag später von dem Vorfall erfährt, klärt er Benning über die getroffene Abrede auf.'
        },
        {
            id: "6",
            creator: this.users[1],
            title: 'Die Machenschaften der zwei Brüder',
            "annotations": [
                "seit langer zeit",
                "eigenen namen unterschreibt",
                "rad meines vaters",
                "rennrad seines vaters",
                "übereignet worden war",
                "edi später selbst",
                "max herausgeben muss",
                "anton weiß max",
                "handy verkauft habe",
                "rennrad zurück"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Max (15) wünscht sich seit langer Zeit eine Spielkonsole, eine Wii. Er nimmt daher das Rennrad seines Vaters und bietet es mit der Behauptung „Das ist das Rad meines Vaters – ich darf es veräußern“ dem Fahrradhändler Flink (F) zum Kauf an. Flink setzt einen Vertrag auf, den Max im eigenen Namen unterschreibt, und händigt Max den Betrag von 250 € aus. Im Elektrofachhandel des Voll (V) erwirbt Max für 200 € beim Ladenangestellten Anton (A) eine Wii, die Anton sofort an Max übergibt. Anders als Anton weiß Max nicht, dass die Wii bereits an Klaus (K) verkauft und übereignet worden war, der sie auf Bitten des Voll bis zum Eintreffen der Neuware in dessen Laden als Ausstellungsstück belassen hatte. Max nimmt die Wii, ist glücklich und fährt wieder heim. Dort wartet schon sein Bruder Bernhard (18) auf ihn. Weil Bernhard (B) sich in Geldnöten befindet, bittet er Max um ein zinsloses Darlehen in Höhe von 50 €, was Max ihm auch gewährt. Zur Sicherheit übereignet er Max ein Handy, das Bernhard bei dem Anbieter Telefonica (T) geleast hatte, unter der auflösenden Bedingung der Darlehensrückzahlung. Weil Bernhard das Handy braucht, behält er es mit der Maßgabe, dass er das Gerät zwar nutzen darf, aber dem Max herausgeben muss, wenn Bernhard das Geld nicht zurückzahlt. Max glaubt nicht an die Rückzahlung. Er verkauft und übereignet das Handy an Christian (C), wobei er ihm seinen Herausgabeanspruch gegen Bernhard abtritt. Christian weiß, dass das Handy nicht Max gehört. Als er das Handy braucht, verlangt er es von Bernhard heraus. Bernhards finanzielle Lage hat sich nicht gebessert. Er verkauft und übergibt daher ein Zelt, das ihm Dirk (D) für den Sommer geliehen hatte, an Edi (E). Edi weiß nicht, dass Bernhard nicht Eigentümer des Zelts ist. Als Edi später selbst in Geldnöte gerät, verkauft sie das Zelt mit Verlust wieder an Bernhard, der sich über das „Schnäppchen“ freut, und übergibt es ihm. Schließlich erfahren auch Max Eltern von all dem: Sofort verlangen sie von Flink das Rennrad zurück. Max soll die Wii zurückgeben, was dieser jedoch verweigert. Dass Max das Handy verkauft habe, ist ihnen hingegen ganz recht.'
        },
        {
            id: "7",
            creator: this.users[2],
            title: 'Getrübter Fahrradspaß',
            "annotations": [
                "verlockenden duft angezogen",
                "fest genug angezogen",
                "nähe ihrer wohnung",
                "caesar läuft so",
                "herrchen kommen vater",
                "schaden allein aufkommen",
                "holger fährt fahrrad",
                "valentin sebastian gegenüber",
                "schaden aufkommen",
                "fährt damit"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Valentin Veith (V) übt mit seinem sechsjährigen Sohn Sebastian (S), für den er sorgeberechtigt ist, Fahrradfahren. Valentin hat an das Fahrrad seines Sohnes Stützräder montiert. Beide benützen – um Sebastian nicht zu gefährden – an einem frühen Sonntagmorgen einen ruhigen Waldweg in der Nähe ihrer Wohnung. Zur gleichen Zeit ist Holger Hofbauer (H) mit seinen Schäferhund Caesar unterwegs. Caesar lebt als Wach- und Begleithund auf dem privaten Grundstück von Holger, der für ihn sorgt. Holger fährt Fahrrad und Caesar läuft so wie immer nebenher. Hund und Herrchen kommen Vater und Sohn entgegen. Plötzlich wird Caesar von einem verlockenden Duft angezogen und rennt knapp vor Holger quer über den Weg. Dadurch verliert Holger für kurze Zeit das Gleichgewicht, verreißt sein Vorderrad und fährt damit in Sebastians Rad. Das hat zur Folge, dass ein Stützrad umknickt und Sebastian stürzt. Dabei bricht sich Sebastian den rechten Arm. Sebastian wird im Krankenhaus vier Tage stationär behandelt. Valentin besucht seinen Sohn täglich für mehrere Stunden, was wesentlich zu dessen Genesung beiträgt. Nachdem Sebastian genesen ist, verlangt Valentin von Holger den vollständigen Ersatz der vorgestreckten Behandlungskosten inklusive seiner Fahrtkosten in das Krankenhaus. Holger meint, er trage allenfalls eine Mitschuld am Unfall des Sebastian. Tatsächlich stellt sich heraus, dass das Stützrad auch deswegen umgeknickt ist, weil Valentin es unsachgemäß montiert hatte. Denn bei der Montage hatte Valentin unachtsam, wie es allgemein seiner auf derartige Dinge verwendeten Sorgfalt entsprach, eine Schraube nicht fest genug angezogen. Holger meint, deshalb müsse auch Valentin haften. Es könne nicht sein, dass er für den Schaden allein aufkommen soll, ohne Regress bei Valentin nehmen zu können, nur weil Valentin zufällig der Vater von Sebastian sei und deshalb Valentin Sebastian gegenüber nicht hafte. Wäre Valentin nicht der Vater, müsste er anteilig für den Schaden aufkommen, weil er und Holger jeweils eine Mitschuld an dem Unfall tragen. Holger schlägt deshalb vor, dass er und Valentin den vollen Schaden jeweils anteilig ersetzen oder der Schaden des Sebastian um den Verschuldensbeitrag des Vaters gekürzt wird.'
        },
        {
            id: "8",
            creator: this.users[2],
            title: 'Die neuen Schuhe',
            "annotations": [
                "derart großen bestand",
                "hergestellten sachen lebt",
                "neue lieferung erhält",
                "trotz seiner zweifel",
                "ihm eingelagert hat",
                "branchenüblichen verlängerten eigentumsvorbehalt",
                "ihm hirschleder besorgen",
                "oktoberfestsaison dringend leder",
                "guten kunden fröhlich",
                "sohle geld braucht"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Lederhändler Lamm (L) ist Eigentümer von 10 qm bester Kalbslederhäute und 100 qm Hirschlederhäute. Dem guten Kunden Fröhlich (F) verkauft er am 31. März 2016 für € 1.000,- die 10 qm Kalbsleder. Die vertraglich wirksam einbezogenen Allgemeinen Geschäftsbedingungen (AGB) des Lamm sehen einen branchenüblichen verlängerten Eigentumsvorbehalt mit Verarbeitungs- und Vorausabtretungsklausel vor. Fröhlich fertigt aus den Kalbslederhäuten 10 Paar hochwertige Reitstiefel. Den Kaufpreis will Fröhlich bis Ende September 2016 zahlen. Der Lederfabrikant Hintermoser (H) ist von der Qualität begeistert und kauft Fröhlich am 3. April 2016 die 10 Paar Reitstiefel für 2.400,- € ab. Hintermoser weiß, dass Fröhlich vom Verkauf der hergestellten Sachen lebt und ansonsten kaum Eigenkapital hat. Der beim Kauf verwendete Mustervertrag des Hintermoser enthält in den wirksam einbezogenen AGB ein Abtretungsverbot. Fröhlich händigt die Reitstiefel sofort an Hintermoser aus. Da Lamm am 15. Mai 2016 eine neue Lieferung erhält und in seinem Lederlager Platz schaffen muss, lagert er die 100 qm Hirschleder beim Zwischenhändler Sohle ein. Hintermoser benötigt für die Oktoberfestsaison dringend Leder und fragt deshalb bei Sohle nach, ob er ihm Hirschleder besorgen kann. Da Sohle Geld braucht, verkauft er am 31. August 2016 Hintermoser die 100 qm Hirschleder, die Lamm bei ihm eingelagert hat. Hintermoser weiß, dass Sohle sich einen derart großen Bestand an hochwertigem Leder nicht leisten kann, fragt aber trotz seiner Zweifel nicht weiter nach, wem das Leder gehört oder ob Sohle zum Verkauf berechtigt ist. Er zahlt Sohle € 16.000,- und fertigt aus dem Hirschleder 400 Paar Herrenschuhe. Ende November 2016 hat Lamm weder von Fröhlich noch von Sohle Zahlung erhalten. Er will daher von Rechtsanwalt Rainer Rührig wissen, ob er von Hintermoser die Reitstiefel und Herrenschuhe wieder heraus verlangen oder zumindest Schadens- oder Wertersatz wegen des Hirschleders verlangen kann.'
        },
        {
            id: "9",
            creator: this.users[1],
            title: 'Nikolaus in Nöten',
            "annotations": [
                "zerbrochenen stab zurück",
                "türe seines autos",
                "dezember gibt claus",
                "dezember verdient claus",
                "dezember holt claus",
                "claus keine rolle",
                "geld dringend braucht",
                "seinen nachbarn dreist",
                "dreist macht dagegen",
                "überdies verschönert claus"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Der Theologiestudent Claus (C) befindet sich in einer finanziellen Krise. Deshalb beschließt er Ende November zur Finanzierung der Weihnachtlichen Ausgaben, in der Adventszeit noch einen Nebenjob anzunehmen. Er bewirbt sich bei der auf die Advents- und Weihnachtszeit spezialisierten Eventagentur „Sternsinger GmbH“ und bekommt von dieser mehrere – durchaus lukrative – Aufträge als Nikolaus vermittelt. Einziger Wehrmutstropfen: Er und sein Begleiter (Krampus) sind verpflichtet ihre Kostüme selbst zu stellen. Am Nachmittag des 4. Dezember holt Claus sein Kostüm bei einem Kostümverleih ab. Auf dem Nachhauseweg ereignet sich dann jedoch ein großes Missgeschick: Claus bleibt mit dem Kostüm in der Kette seines Fahrrades hängen, so dass das Kostüm völlig zerreißt. Es ist für die am 5. und 6. Dezember geplanten 12 Auftritte völlig unbrauchbar. Ein anderes Nikolauskostüm ist auf die Schnelle nicht aufzutreiben. Bevor er alle Aufträge absagen muss, wendet sich Claus an seinen Nachbarn Dreist (D): Dieser ist bereits mehrmals als Nikolaus aufgetreten, verfügt auch über ein Kostüm und ist bereit, dieses Claus gegen 85 % der erzielten Einnahmen zu leihen. Da Claus das Geld dringend braucht und außerdem die Kinder nicht enttäuschen will, willigt er ein. Das Kostüm ist verdreckt und der Besatz am Mantel ist abgerissen. Damit Claus das Kostüm überhaupt für seine Auftritte verwenden kann, lässt er es im Waschsalon für 3 € waschen und trocknen und den abgerissenen Besatz von einer Schneiderin für 15 € wieder annähen. Überdies verschönert Claus das Kostüm, indem er die Bischofsmütze mit neuer Goldfolie (Kosten: 3 €) beklebt, da die alte bereits ausgeblichen war, so dass er als Bischof „glänzen kann“. Ob Dreist davon profitiert, spielt für Claus keine Rolle. Am 5. und 6. Dezember verdient Claus bei den Auftritten insgesamt 400 €. Allerdings ist er bei dem letzten Auftritt etwas unachtsam und klemmt den Bischofsstab in der Türe seines Autos ein, so dass dieser zerbricht. Am 7. Dezember gibt Claus dem Dreist das Kostüm und den zerbrochenen Stab zurück und will ihm als Mietgebühr 50 € geben. Dreist will davon nichts wissen: Er verlangt die vereinbarten 85 %, also 340 €. Wenigstens verlangt er Nutzungsersatz für das Kostüm. Claus hält das für völlig überzogen: Im Kostümverleih hätte er für zwei Tage 70 € bezahlt, was Dreist auch wusste. Überdies will er das Geld für die Wäsche, die Näharbeiten und die Goldfolie. Dreist macht dagegen die Kosten für einen neuen Bischofsstab (35 €) geltend, weil er das schönere Kostüm gut für weitere Auftritte gebrauchen kann.'
        },
        {
            id: "10",
            creator: this.users[2],
            title: 'Unzuverlässiger Spediteur',
            "annotations": [
                "keinen platz mehr",
                "keine verwendung mehr",
                "eigenen kfz-werkstatt aufgeben",
                "straße parken will",
                "ihnen vereinbarten kaufpreis",
                "redlichen konrad klein",
                "dann veräußert viktor",
                "vereinbarten kaufpreises",
                "alles kommt",
                "regelung einverstanden"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Sebastian Sorglos musste seinen Traum von der eigenen Kfz-Werkstatt aufgeben. Da er die dafür angemietete Garage räumen muss, hat er auch keine Verwendung mehr für den Oldtimer (Baujahr 1969; Wert: 65.000,- €), der dort geparkt ist. Er will ihn deshalb an seinen Freund Viktor Vila verkaufen. Dieser ist aber zurzeit nicht flüssig. Da Viktor aber großes Interesse an dem Auto zeigt, vereinbaren beide, dass Viktor den Wagen gegen Ratenzahlung zwar haben könne, aber erst, wenn er alle Raten des vereinbarten Kaufpreises in Höhe von 69.000,- € bezahlt hat. Bis dahin soll der Oldtimer noch im Eigentum des Sebastian verbleiben. Weitere Gebühren o.ä. muss Viktor nicht zahlen. Viktor ist mit dieser Regelung einverstanden. Sebastian hat bei sich keinen Platz mehr für den Wagen. Da er ihn aber auch nicht auf der Straße parken will, vereinbart er mit einem befreundeten Spediteur, Ludwig Lang, dass er den Oldtimer bei diesem in einer verschließbaren Garage abstellen darf. Ausnahmsweise verzichtet Lang dafür auf Einlagerungsgebühren, weil Sebastian ihm unentgeltlich einen PKW repariert hatte und er Sebastian daher noch einen Gefallen schuldet. Viktor braucht selbst dringend Geld: Er spiegelt vor vollständiger Kaufpreiszahlung dem redlichen Konrad Klein vor, dass ihm, dem Viktor, der bei Lang eingelagerte Oldtimer gehöre. Dann veräußert Viktor das Auto dem Klein durch Abtretung „seines”, des Viktor, gegen Lang bestehenden Herausgabeanspruchs, wobei Klein dem Viktor den von ihnen vereinbarten Kaufpreis von 72.000,- € sofort auszahlt. Dies alles kommt nun Sebastian zu Ohren. Er fährt sofort zu Lang und verlangt Aufklärung. Lang versichert nun gegenüber dem Sebastian, er verwahre weiterhin für Sebastian den Oldtimer. Als Sebastian wieder gefahren ist, stellt Lang dem Klein, der sich bei Lang „sein“ Auto ansieht, auf dessen Wunsch einen Namenslagerschein über den Oldtimer aus. Der Oldtimer verbleibt aber bei Lang, da Klein selbst noch keine geeignete Unterbringungsmöglichkeit hat.'
        },
        {
            id: "11",
            creator: this.users[4],
            title: 'Insolvenz eines Bauunternehmers',
            "annotations": [
                "schriftlichen vertrag heißt",
                "glastürentüren beauftragt b",
                "werklohnansprüche übereignet b",
                "verkauft ihn umgehend",
                "bauunternehmer b",
                "nimmt ihn",
                "fensterbauer f",
                "f vereinbaren",
                "b noch",
                "baumaschinenhändler h"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Bauunternehmer B ist neu im Geschäft. Für den Bau eines Bürogebäudes erwirbt er bei Baumaschinenhändler H einen Mobilkran und nimmt ihn in unmittelbaren Besitz. B und H vereinbaren, dass H bis zur Zahlung des Kaufpreises Eigentümer der Maschine bleibt. Für den Einbau von Glasfenstern und Glastürentüren beauftragt B den Fensterbauer F als Subunternehmer. Zur Sicherung dessen Werklohnansprüche übereignet B dem F den Mobilkran. B und F vereinbaren, dass B die Maschine weiterhin nutzen darf, aber herausgeben muss, wenn B den Werklohn nicht zahlt. Im schriftlichen Vertrag heißt es außerdem: „F ist berechtigt, den Mobilkran in unmittelbaren Besitz zu nehmen, wenn B seinen vertraglichen Pflichten nicht nachkommt.“ Als B noch vor Fertigstellung des Baus die Arbeiten einstellt, mehren sich die Gerüchte einer Insolvenz des B. F, der um seinen Werklohn fürchtet, schickt daher noch vor Abnahme seines Werkes seinen Gesellen G auf die Baustelle, um den Mobilkran abzuholen, und verkauft ihn umgehend an den Bauunternehmer X. Da X nicht auffindbar ist, verlangt H von F die Auszahlung des Verkaufserlöses in Höhe von 200.000 €.'
        },
        {
            id: "12",
            creator: this.users[4],
            title: 'Kaufen statt Mieten',
            "annotations": [
                "übung gekommen sei",
                "dafür bieten könne",
                "unentgeltlich helfen könnte",
                "vereinbarten festpreis entsteht",
                "„richtige fleckchen erde",
                "nötigen materialien besorge",
                "arbeitsleistung seines schwagers",
                "termin beim notar",
                "macht b sogleich",
                "rohbauarbeiten merkt b"
            ],
            date: '01.06.2019',
            keypoints: [''],
            file: 'Egon Eigenheim (E) beschließt, sein Erspartes für den Erwerb eines Eigenheimes zu verwenden. Kurze Zeit später liest er eine Zeitungsanzeige des ortsansässigen Bauunternehmers B, dass dieser nicht nur qualitativ hochwertige Häuser errichte, sondern auch für jeden Geschmack das „richtige Fleckchen Erde“ dafür bieten könne. Nach einigen Besprechungen zwischen E und B werden sich die beiden einig. E hat sich für das von B angebotene Baugrundstück am Stadtrand entschieden und möchte, dass darauf ein zweistöckiges Einfamilienhaus zum vereinbarten Festpreis entsteht. Damit es sich E nicht noch einmal anders überlegt, macht B sogleich einen Termin beim Notar aus. Dort werden sämtliche Vertragsabreden zwischen E und B ordnungsgemäß notariell beurkundet. Kurz darauf beginnt B mit dem Bauvorhaben. Nach Abschluss der Rohbauarbeiten merkt B, dass er sich etwas verkalkuliert und schon viel zu viel von dem Geld ausgegeben hat, das er von E für das Grundstück und dessen Bebauung erhalten hat. Um seinen Gewinn nicht noch weiter zu schmälern, entschließt er sich die Dachdeckerarbeiten nicht von einer renommierten Dachdeckerfirma D ausführen zu lassen, sondern „schwarz“ von seinem Nachbarn N, der vor seiner Arbeitslosigkeit bei D gearbeitet hat. N ist weder in der Handwerksrolle eingetragen noch hat er einen Gewerbebetrieb angemeldet, was B auch bekannt ist. Steuern und Sozialversicherungsbeiträge führen weder N noch B ab. Vier Wochen nach der Beauftragung des N ist das Dach fertig eingedeckt und N verlangt von B seine vereinbarte Entlohnung von 500 €. Dieser verweigert jedoch die Zahlung mit der Begründung, dass N infolge seiner Arbeitslosigkeit und der ständigen Kneipenbesuche wohl etwas aus der Übung gekommen sei und deshalb das Dach mangelhaft gedeckt sei. Tatsächlich weist das Dach an drei Stellen erhebliche Mängel auf. Als das Einfamilienhaus komplett fertig gestellt ist, vereinbaren B und E einen Abnahmetermin. Bei diesem Termin entdeckt E eine unübersehbare Pfütze im oberen Stockwerk, die durch eindringendes Regenwasser an einer der mangelhaft gedeckten Stellen des Daches verursacht wurde. Auch an den beiden anderen mangelhaft gedeckten Stellen des Daches befinden sich großflächige feuchte Stellen. E der seine Mietwohnung bereits gekündigt hat will trotz der Mängel innerhalb von vier Wochen in sein neues Eigenheim einziehen und setzt B eine Frist für die Beseitigung der Mängel am Dach von drei Wochen. B schreibt daraufhin dem N einen Brief, in dem er ihn auffordert, innerhalb von drei Wochen die Mängel an den drei Stellen am Dach zu beseitigen. Denn schließlich habe N den Mangel verursacht, also müsse auch er ihn beheben und B habe damit nichts zu tun. N hingegen ist der Auffassung, dass er keine Mängel beseitigen müsse, solange er von B noch kein Geld für das Eindecken des Daches erhalten habe. Deshalb erfolgt die Mängelbeseitigung nicht innerhalb der gesetzten Frist von drei Wochen. Als E dies nach Fristablauf erfährt, wird er langsam ungeduldig, weil er nur noch eine Woche Zeit für seinen Umzug hat. Seine Schwester hat die Idee, dass ihr Mann als Dachdeckermeister kurzfristig am Wochenende und unentgeltlich helfen könnte. Wenn E die nötigen Materialien besorge, könnten die drei undichten Stellen im Dach im Laufe eines Samstages beseitigt werden. Die Reparatur der undichten Stellen im Dach und der Umzug des E gehen reibungslos vonstatten. Einen Monat später verlangt B von E die Zahlung der letzten Abschlagszahlung in Höhe von 20.000 €. Dieser will mit seinen Materialaufwendungen (500 €) und der Arbeitsleistung seines Schwagers, die bei Inanspruchnahme einer Fachfirma 500 € gekostet hätte, aufrechnen und erklärt dies B in einem Telefonat.'
        }
    ];
    collections: Collection[] = [
        { id: "1", ref_id: "XD21071105FGH", reference: 'Allgemeines Verwaltungsgesetz', creator: this.users[0], title: 'Die heiße Pizza', date: '01.04.2019', documents: [this.documents[1], this.documents[2], this.documents[3], this.documents[4]], attachments: [''],
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        { id: "2", ref_id: "XD21071105FGH", reference: 'Allgemeines Verwaltungsgesetz', creator: this.users[0], title: 'Die heiße Pizza', date: '01.04.2019', documents: [this.documents[1], this.documents[2], this.documents[3], this.documents[4]], attachments: [''],
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        { id: "3", ref_id: "XD21071105FGH", reference: 'Allgemeines Verwaltungsgesetz', creator: this.users[0], title: 'Die heiße Pizza', date: '01.04.2019', documents: [this.documents[1], this.documents[2], this.documents[3], this.documents[4]], attachments: [''],
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        { id: "4", ref_id: "XD21071105FGH", reference: 'Allgemeines Verwaltungsgesetz', creator: this.users[0], title: 'Die heiße Pizza', date: '01.04.2019', documents: [this.documents[1], this.documents[2], this.documents[3], this.documents[4]], attachments: [''],
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' },
        { id: "5", ref_id: "XD21071105FGH", reference: 'Allgemeines Verwaltungsgesetz', creator: this.users[0], title: 'Die heiße Pizza', date: '01.04.2019', documents: [this.documents[1], this.documents[2], this.documents[3], this.documents[4]], attachments: [''],
            summary: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' }
    ];
    histories: History[] = [
        {id: "1", collections: null, documents: null},
        {id: "2", collections: null, documents: null},
        {id: "3", collections: null, documents: null},
        {id: "4", collections: null, documents: null}
    ];
    saved: Attachments[] = [
        {id: "1", collections: null, documents: null},
        {id: "2", collections: null, documents: null},
        {id: "3", collections: null, documents: null},
        {id: "4", collections: null, documents: null}
    ];
    attachments: Attachments[] = [
        {id: "1", collections: null, documents: null},
        {id: "2", collections: null, documents: null},
        {id: "3", collections: null, documents: null}
    ];
    clients: Client[] = [
        {
            id: "1",
            firstName: 'Harald',
            lastName: 'Krüger',
            address: 'Petuelring 124-130, 80809 München',
            birthday: '1980-01-01',
            email: 'corporate.website@bmwgroup.com',
            phone: '+49 89 382-0',
            attachments: this.attachments[0]
        },
        {
            id: "2",
            firstName: 'Joe',
            lastName: 'Kaeser',
            address: 'Werner-von-Siemens-Straße 1, 80333 München',
            birthday: '1980-06-01',
            email: 'contact@siemens.com',
            phone: '+49 89 636-00',
            attachments: this.attachments[1]
        },
        {
            id: "3",
            firstName: 'Dr. Klaus-Peter',
            lastName: 'Röhler',
            address: 'Königinstraße 28, 80802 München',
            birthday: '1980-12-01',
            email: 'info@allianz.de',
            phone: '+49 89 3800-0',
            attachments: this.attachments[2]
        }
    ];

    constructor() {
        this.users[0].history = this.histories[0];
        this.users[1].history = this.histories[1];
        this.users[2].history = this.histories[2];
        this.users[3].history = this.histories[3];

        this.users[0].saved = this.saved[0];
        this.users[1].saved = this.saved[1];
        this.users[2].saved = this.saved[2];
        this.users[3].saved = this.saved[3];

        this.users[0].clients = [this.clients[0]];
        this.users[1].clients = [this.clients[1]];
        this.users[2].clients = [this.clients[2]];
        this.users[3].clients = [this.clients[2]];

    };

    getUsers(): User[] {
        return this.users;
    };
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let fake = new FakeData();
        let users = fake.getUsers();


        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/user/login') && request.method === 'POST') {

                let user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
            }

            // get all users
            if (request.url.endsWith('/user/list') && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                return ok(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({status: 200, body}));
        }

        function unauthorised() {
            return throwError({status: 401, error: {message: 'Unauthorised'}});
        }

        function error(message) {
            return throwError({status: 400, error: {message}});
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};