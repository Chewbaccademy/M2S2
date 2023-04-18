from Action import Action, Mouvement
from Agent import Agent
from Etat import Etat


ei= Etat("Init", 0)
e1 = Etat("1", 1)
e2 = Etat("2", 2)
e3 = Etat("3", 3)
e4 = Etat("4", 4)
e5 = Etat("5", 5)
e6 = Etat("6", 6)


mouv1 = Mouvement(e1, 1/6)
mouv2 = Mouvement(e2, 1/6)
mouv3 = Mouvement(e3, 1/6)
mouv4 = Mouvement(e4, 1/6)
mouv5 = Mouvement(e5, 1/6)
mouv6 = Mouvement(e6, 1/6)

actionInitiale = Action("L", None, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], 1)
action1g = Action("1G", e1, [], 0)
action1l = Action("1L", e1, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)
action2g = Action("2G", e2, [], 0)
action2l = Action("2L", e2, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)
action3g = Action("3G", e3, [], 0)
action3l = Action("3L", e3, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)
action4g = Action("4G", e4, [], 0)
action4l = Action("4L", e4, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)
action5g = Action("5G", e5, [], 0)
action5l = Action("5L", e5, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)
action6g = Action("6G", e6, [], 0)
action6l = Action("6L", e6, [mouv1, mouv2, mouv3, mouv4, mouv5, mouv6], -1)

joueur = Agent("Joe", ei, 0.9, 0.8, 0.5)
joueur.simuler()