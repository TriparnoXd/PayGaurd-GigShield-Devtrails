import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Card, BottomNav } from '../components';
import { useEarningsStore } from '../store';

export const EarningsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'earnings' | 'shield'>('earnings');
  const weeklyEarnings = useEarningsStore((state) => state.weeklyEarnings);
  const payoutHistory = useEarningsStore((state) => state.payoutHistory);

  const maxEarning = Math.max(
    ...(weeklyEarnings?.dailyBreakdown.map((d) => d.amount) || [0])
  );

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <View style={styles.appBar}>
        <View style={styles.appBarContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profilePlaceholder}>RD</Text>
            </View>
            <Text style={styles.appTitle}>Earnings</Text>
          </View>
          <View style={styles.earningsBadge}>
            <Text style={styles.badgeIcon}>💰</Text>
            <Text style={styles.badgeText}>THIS WEEK</Text>
          </View>
        </View>
        <View style={styles.appBarDivider} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.totalCard}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalLabel}>Total Protected Earnings</Text>
            <View style={styles.shieldBadge}>
              <Text style={styles.shieldIcon}>🛡️</Text>
            </View>
          </View>
          <Text style={styles.totalAmount}>
            {formatCurrency(weeklyEarnings?.totalEarned || 0)}
          </Text>
          <View style={styles.weeklyStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Protected</Text>
              <Text style={styles.statValue}>
                {formatCurrency(weeklyEarnings?.protectedAmount || 0)}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Deliveries</Text>
              <Text style={styles.statValue}>
                {weeklyEarnings?.dailyBreakdown.reduce((sum, d) => sum + d.deliveries, 0) || 0}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Daily Breakdown</Text>
          <Card variant="elevated" style={styles.chartCard}>
            <View style={styles.chart}>
              {weeklyEarnings?.dailyBreakdown.map((day, index) => (
                <View key={day.date} style={styles.chartColumn}>
                  <View style={styles.chartBarContainer}>
                    <View
                      style={[
                        styles.chartBar,
                        day.protected && styles.chartBarProtected,
                        { height: `${(day.amount / maxEarning) * 100}%` },
                      ]}
                    />
                    {day.protected && <View style={styles.protectedDot} />}
                  </View>
                  <Text
                    style={[
                      styles.chartLabel,
                      day.protected && styles.chartLabelActive,
                    ]}
                  >
                    {day.date}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors['surface-container-highest'] }]} />
                <Text style={styles.legendText}>Standard Day</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                <Text style={styles.legendText}>Protected Day</Text>
              </View>
            </View>
          </Card>
        </View>

        <View style={styles.payoutSection}>
          <Text style={styles.sectionTitle}>Recent Payouts</Text>
          {payoutHistory.map((payout, index) => (
            <Card key={index} variant="default" style={styles.payoutCard}>
              <View style={styles.payoutContent}>
                <View style={styles.payoutIcon}>
                  <Text style={styles.payoutEmoji}>💵</Text>
                </View>
                <View style={styles.payoutDetails}>
                  <Text style={styles.payoutTitle}>Disruption Payout</Text>
                  <Text style={styles.payoutDate}>
                    {new Date(payout.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={styles.payoutAmount}>+{formatCurrency(payout.amount)}</Text>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomNav activeTab={activeTab} onTabPress={(tab) => {
        setActiveTab(tab);
        if (tab === 'dashboard') navigation.navigate('Dashboard');
        if (tab === 'shield') navigation.navigate('ProtectionPlans');
      }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appBar: {
    backgroundColor: colors.surface,
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
  },
  appBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['primary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholder: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    fontSize: 14,
  },
  appTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['headline-md'],
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  earningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    gap: 6,
  },
  badgeIcon: {
    fontSize: 14,
  },
  badgeText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-secondary-container'],
  },
  appBarDivider: {
    height: 2,
    backgroundColor: colors['surface-container'],
  },
  scrollContent: {
    paddingTop: spacing[6],
    paddingHorizontal: spacing[6],
    paddingBottom: 100,
  },
  totalCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.default,
    padding: spacing[6],
    marginBottom: spacing[6],
    ...shadows.kinetic,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  totalLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['secondary-fixed'],
  },
  shieldBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors['secondary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldIcon: {
    fontSize: 18,
  },
  totalAmount: {
    fontFamily: typography.fonts.headline,
    fontSize: 48,
    fontWeight: typography.weights.extrabold,
    color: colors['on-primary'],
    letterSpacing: typography.letterSpacing.tight,
  },
  weeklyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-primary'],
    opacity: 0.7,
    marginBottom: spacing[1],
  },
  statValue: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-lg'],
    fontWeight: typography.weights.bold,
    color: colors['on-primary'],
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: spacing[4],
  },
  chartSection: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-lg'],
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
    marginBottom: spacing[4],
    marginLeft: spacing[2],
  },
  chartCard: {
    padding: spacing[6],
  },
  chart: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '80%',
    backgroundColor: colors['surface-container-highest'],
    borderRadius: 8,
    minHeight: 20,
  },
  chartBarProtected: {
    backgroundColor: colors.primary,
  },
  protectedDot: {
    position: 'absolute',
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors['secondary-fixed'],
  },
  chartLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
    marginTop: spacing[2],
  },
  chartLabelActive: {
    color: colors.primary,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing[6],
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors['outline-variant'],
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-surface-variant'],
  },
  payoutSection: {
    marginBottom: spacing[6],
  },
  payoutCard: {
    marginBottom: spacing[3],
  },
  payoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[4],
    gap: spacing[4],
  },
  payoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors['primary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  payoutEmoji: {
    fontSize: 20,
  },
  payoutDetails: {
    flex: 1,
  },
  payoutTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-sm'],
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
  },
  payoutDate: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-surface-variant'],
    marginTop: spacing[1],
  },
  payoutAmount: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-md'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  bottomSpacer: {
    height: 100,
  },
});