import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

type TabName = 'dashboard' | 'earnings' | 'shield';

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

interface TabConfig {
  icon: string;
  label: string;
}

const tabs: Record<TabName, TabConfig> = {
  dashboard: { icon: '📊', label: 'Dashboard' },
  earnings: { icon: '💰', label: 'Earnings' },
  shield: { icon: '🛡️', label: 'My Shield' },
};

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {(Object.keys(tabs) as TabName[]).map((tab) => {
          const isActive = tab === activeTab;
          const config = tabs[tab];

          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                isActive && styles.activeTab,
              ]}
              onPress={() => onTabPress(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.icon, isActive && styles.activeIcon]}>
                {config.icon}
              </Text>
              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
              >
                {config.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.handle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: `${colors.background}CC`,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 16,
    paddingBottom: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[4],
    opacity: 0.6,
  },
  activeTab: {
    backgroundColor: colors['surface-container-highest'],
    borderRadius: borderRadius.full,
    opacity: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 2,
  },
  activeIcon: {
    // Filled icon state
  },
  label: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-surface'],
  },
  activeLabel: {
    color: colors.primary,
  },
  handle: {
    width: 64,
    height: 4,
    backgroundColor: colors['surface-container-high'],
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing[2],
  },
});