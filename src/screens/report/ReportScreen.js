import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiRequest } from "../../api/apiClient";
import AppHeader from "../../components/common/AppHeader";

const { width } = Dimensions.get("window");

const colors = {
  accent: "#3A86FF",
  success: "#06D6A0",
  warn: "#FFD166",
  text: "#222B45",
  subText: "#8F9BB3",
  bg: "#F7F9FC",
  card: "#FFFFFF",
};

// Legend Component
const LegendDot = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={{ fontSize: 12, color: "#555" }}>{label}</Text>
  </View>
);

export default function ReportScreen() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── API Call ───────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    const result = await apiRequest({
      method: "GET",
      url: "/reports",
      showLoader: false, // apna loader use kar raha hai
    });

    if (result.success) {
      setReportData(result.data.data); // result.data = full response, .data = actual payload
    }
    setLoading(false);
  };

  // ─── Bar Chart Data Builder ──────────────────────────────────────────────────
  const buildBarData = () => {
    if (!reportData?.collection_type_graph) return [];

    const { months, series } = reportData.collection_type_graph;

    // series = [{name: "Cheque", data: [...]}, {name: "Online", ...}, {name: "DD", ...}]
    const seriesColorMap = {
      Cheque: colors.success,
      Online: colors.accent,
      DD: colors.warn,
    };

    const bars = [];
    months.forEach((month, monthIndex) => {
      series.forEach((s, seriesIndex) => {
        bars.push({
          value: s.data[monthIndex] || 0,
          // only first series of each month gets label
          label: seriesIndex === 0 ? month : "",
          frontColor: seriesColorMap[s.name] || colors.accent,
        });
      });
    });

    return bars;
  };

  // ─── Pie Chart Data Builder ──────────────────────────────────────────────────
  const buildPieData = () => {
    if (!reportData?.proficiency_summary) return { pieData: [], total: 0 };

    const { attempt, not_attempt, total } = reportData.proficiency_summary;

    const pieData = [
      {
        value: attempt.percentage || 0,
        color: colors.success,
        text: "Attempt",
        percent: `${attempt.percentage ?? 0}%`,
      },
      {
        value: not_attempt.percentage || 0,
        color: colors.warn,
        text: "Not Attempt",
        percent: `${not_attempt.percentage ?? 0}%`,
      },
    ];

    return { pieData, total };
  };

  // ─── Loading State ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ marginTop: 10, color: colors.subText }}>Loading report...</Text>
      </SafeAreaView>
    );
  }

  // ─── No Data State ───────────────────────────────────────────────────────────
  if (!reportData) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}
      >
        <MaterialIcons name="error-outline" size={48} color={colors.warn} />
        <Text style={{ marginTop: 10, color: colors.subText }}>Failed to load report</Text>
      </SafeAreaView>
    );
  }

  const barData = buildBarData();
  const { pieData, total } = buildPieData();

  return (
    <>
      <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.bg }}
        edges={[ "bottom"]}
      >
        <AppHeader  title={"Notifications"} />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* ── Summary Card ── */}
          <View style={[styles.card, { backgroundColor: "#E9F2FF" }]}>
            <MaterialIcons name="assignment" size={36} color={colors.accent} />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={[styles.cardTitle, { color: colors.subText }]}>
                Total Dispositions
              </Text>
              <Text style={[styles.cardValue, { color: colors.accent }]}>
                {reportData.summary?.total ?? 0} Records
              </Text>
            </View>
            {/* Unique Accounts */}
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.cardTitle, { color: colors.subText }]}>Unique Accounts</Text>
              <Text style={[styles.cardValue, { color: colors.success }]}>
                {reportData.summary?.unique_accounts ?? 0}
              </Text>
            </View>
          </View>

          {/* ── Disposition Breakdown ── */}
          <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>By Disposition</Text>
            {reportData.by_disposition?.length > 0 ? (
              reportData.by_disposition.map((item, index) => (
                <View key={index} style={styles.dispositionRow}>
                  <View style={styles.dispositionLabelRow}>
                    <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                    <Text style={{ color: colors.text, fontSize: 13 }}>{item.label}</Text>
                  </View>
                  <Text style={{ color: colors.accent, fontWeight: "700", fontSize: 13 }}>
                    {item.value}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.subText, textAlign: "center" }}>No data</Text>
            )}
          </View>

          {/* ── Visit Status Breakdown ── */}
          <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>By Visit Status</Text>
            {reportData.by_visit_status?.length > 0 ? (
              reportData.by_visit_status.map((item, index) => (
                <View key={index} style={styles.dispositionRow}>
                  <View style={styles.dispositionLabelRow}>
                    <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                    <Text style={{ color: colors.text, fontSize: 13 }}>{item.label}</Text>
                  </View>
                  <Text style={{ color: colors.success, fontWeight: "700", fontSize: 13 }}>
                    {item.value}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.subText, textAlign: "center" }}>No data</Text>
            )}
          </View>

          {/* ── Bar Chart: Collection Type ── */}
          <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>
              Disposition Trade Overview
            </Text>
            {barData.length > 0 ? (
              <>
                <BarChart
                  data={barData}
                  barWidth={width * 0.05}
                  spacing={width * 0.025}
                  width={width * 0.82}
                  roundedTop
                  isAnimated
                  animationDuration={1000}
                  noOfSections={5}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  hideRules
                  barBorderRadius={6}
                  yAxisTextStyle={{ color: colors.subText, fontSize: 10 }}
                  xAxisLabelTextStyle={{ color: colors.subText, fontSize: 12 }}
                />
                <View style={styles.legendContainer}>
                  <LegendDot color={colors.success} label="Cheque" />
                  <LegendDot color={colors.accent} label="Online" />
                  <LegendDot color={colors.warn} label="DD" />
                </View>
              </>
            ) : (
              <Text style={{ color: colors.subText, textAlign: "center" }}>No data</Text>
            )}
          </View>

          {/* ── Pie Chart: Proficiency ── */}
          <View
            style={[styles.chartCard, { backgroundColor: colors.card, alignItems: "center" }]}
          >
            <Text style={[styles.chartTitle, { color: colors.text }]}>Proficiency Summary</Text>

            {total > 0 ? (
              <>
                <PieChart
                  data={pieData}
                  donut
                  radius={width * 0.26}
                  innerRadius={width * 0.16}
                  animationDuration={600}
                  focusOnPress
                  centerLabelComponent={() => (
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>
                        {total}
                      </Text>
                      <Text style={{ fontSize: 12, color: colors.subText }}>Total</Text>
                    </View>
                  )}
                />
                <View style={styles.legendContainer}>
                  {pieData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                      <Text style={{ fontSize: 12, color: colors.text }}>
                        {item.text} ({item.percent})
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              // ── Zero state for pie chart ──
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <MaterialIcons name="pie-chart" size={60} color={colors.subText} />
                <Text style={{ color: colors.subText, marginTop: 8 }}>
                  No proficiency data available
                </Text>
                <View style={styles.legendContainer}>
                  {pieData.map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                      <Text style={{ fontSize: 12, color: colors.text }}>
                        {item.text} (0%)
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: { fontSize: 13 },
  cardValue: { fontSize: 18, fontWeight: "700" },
  chartCard: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  dispositionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dispositionLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});