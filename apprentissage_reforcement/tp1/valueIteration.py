import random    

# The value iteration algorithme to calulate the value function for each state
def valueIteration(states, actions, transitions, rewards, epsilon, gamma):
    # delta to mesure the difference between state values in precedent and current function
    delta=1
    # initialise the value function to 0 for all states
    V= { s:0.0 for s in states}
    i= 1
    # value iteration loop with stop condition  delta < epsilon
    
    while delta >= epsilon:
        V0 = V.copy()
        for v in V:
            mdps = []
            for a in actions:
                rsa = rewards(v, a)
                som = 0
                transitions_ = transitions(v, a)
                for state in transitions_:
                    som += transitions_[state] * V[state]
                mdps.append(rsa + gamma * som)
            V0[v] = max(mdps)
            
        print(V)
            
        
        delta = max([abs(V0[v] - V[v]) for v in V])
        V = V0

    
    
    print(f"delta : {delta} | coeffs : {V}")
    
    return V


def playEpisode(departure, is_arrival, coeffs, actions, transitions, rewards, gamma):
    print(departure, end="")
    current_state = departure
    while not is_arrival(current_state):
        coefficients = dict()
        for a in actions:
            transitions_ = transitions(current_state, a)
            coefficients[a] = sum([coeffs[state]  * transitions_[state] + rewards(current_state, a) for state in transitions_])
            
        max_coeff = 0
        choix = current_state
        for c in coefficients:
            if coefficients[c] > max_coeff:
                max_coeff = coefficients[c]
                choix = c
        
        next_states = []
        weights = []
        transitions_ = transitions(current_state, choix)
        for state in transitions_:
            next_states.append(state)
            weights.append(transitions_[state])
            
        next_state = random.choices(population=next_states, weights=weights)[0]
        
        print(" -> " + next_state, end="")
        current_state = next_state