from Etat import Etat
from Action import Action
import random as rd

class Agent:
    
    def __init__(self, nom:str, etat_initial:Etat, tx_apprentissage:float, tx_exploration:float, facteur_attenuation:float) -> None:
        self.__filtrer_0_1("tx_apprentissage", tx_apprentissage)
        self.__filtrer_0_1("tx_exploration", tx_exploration)
        self.__filtrer_0_1("facteur_attenuation", facteur_attenuation)
        self.nom = nom
        self.etat_courant = etat_initial
        self.tx_apprentissage = tx_apprentissage
        self.tx_exploration = tx_exploration
        self.facteur_attenuation = facteur_attenuation
        self.memoire = dict()
        
    def simuler(self):
        for i in range(3):
            self.transiter()
        
    def explorer(self) -> bool:
        actions_possibles:list[Action] = [action for action in self.etat_courant if self.etat_courant.nom not in self.memoire and action.nom not in self.memoire[self.etat_courant.nom]]
        if actions_possibles == []:
            return False
        action_entreprise = rd.choice(actions_possibles)
        etat_arrive, recompense = action_entreprise.consommer()
        tmp_valeur = self.__calculer_bellman(recompense, etat_arrive.valeur)
        
        if self.etat_courant not in self.memoire:
            self.memoire[self.etat_courant] == dict()
        
        if action_entreprise.nom not in self.memoire[self.etat_courant]:
            self.memoire[self.etat_courant][action_entreprise.nom] == recompense
        
        if tmp_valeur > self.etat_courant.valeur:
            self.etat_courant.valeur = tmp_valeur
        return True
            
            
    def exploiter(self) -> bool:
        actions_possibles:list[Action] = [action for action in self.etat_courant if self.etat_courant.nom in self.memoire and action.nom in self.memoire[self.etat_courant.nom]]
        if actions_possibles == []:
            return False
        action_entreprise = self.trouver_meilleure_action(actions_possibles)
        etat_arrive, _ = action_entreprise.consommer()
        self.etat_courant = etat_arrive
        return True
        
    def transiter(self):
        decideur_exploration = rd.random()
        exploration = decideur_exploration < self.tx_exploration
        if exploration:
            if not self.explorer():
                self.exploiter()
        else:
            if not self.exploiter():
                self.explorer()
        
    def __filtrer_0_1(self, name:str, valeur:float):
        if not (0 <= valeur <= 1):
            raise ValueError(f"{name} doit être comprise entre 0 et 1. Valeur actuelle : {valeur}")
        
    def trouver_meilleure_action(self, list_action:list[Action]) -> Action:
        max_val = 0
        max_action = ""
        for action_name in self.memoire[self.etat_courant]:
            if self.memoire[self.etat_courant][action_name] > max_val:
                max_action = action_name
                max_val = self.memoire[self.etat_courant][action_name]
        
        for action in list_action:
            if action.nom == max_action:
                return action
            
        raise Exception("A cause d'une erreur inconnue, aucune action n'a été trouvée")
        
        
    def __calculer_bellman(self, recompense, valeur_etat_arrive):
        a = self.tx_apprentissage
        e = self.tx_exploration
        l = self.facteur_attenuation
        q = self.etat_courant.valeur
        return (1 - a) * q + a * (recompense + l * valeur_etat_arrive)
        
